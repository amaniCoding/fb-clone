"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";

export async function reactAPost(
  id: string,
  mediaId: string,
  reactionType: ReactionType
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const post = await prisma.oPagePost.update({
      where: {
        id: id,
      },
      data: {
        medias: {
          update: {
            where: {
              id: mediaId,
            },
            data: {
              reactions: {
                create: {
                  reactionType: reactionType,
                  user: {
                    connect: {
                      id: session.user.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
      select: {
        medias: {
          where: {
            id: mediaId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    const gReactionsForPostMedia = await prisma.mediaReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: post.medias[0].id,
      },
    });

    return {
      success: true,
      _gReactions: gReactionsForPostMedia,
      reactionType,
      message: "Success ",
    };
  } catch (error) {
    return {
      success: true,
      _gReactions: [],
      reactionType: undefined,
      message: "Failed ",
    };
  }
}
