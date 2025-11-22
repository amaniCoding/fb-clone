"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";

export async function reactAPost(
  id: string,
  mediaId: string,
  commentId: string,
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
              comments: {
                update: {
                  where: {
                    id: commentId,
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
          },
        },
      },
      include: {
        medias: {
          where: {
            id: mediaId,
          },
          select: {
            comments: {
              where: {
                id: commentId,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const gReactionsForThisPostMediaComment =
      await prisma.mediaReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: post.medias[0].comments[0].id,
        },
      });

    return {
      success: true,
      _gReactions: gReactionsForThisPostMediaComment,
      message: "Success ",
    };
  } catch (error) {
    return {
      success: true,
      _gReactions: [],
      message: "Failed ",
    };
  }
}
