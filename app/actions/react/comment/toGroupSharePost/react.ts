"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";

export async function reactAPost(
  id: string,
  commentId: string,
  reactionType: ReactionType
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const post = await prisma.toGroupSharePost.update({
      where: {
        id: id,
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
    });

    const gReactionsForPostComment = await prisma.commentReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: post.comments[0].id,
      },
    });

    return {
      success: true,
      _gReactions: gReactionsForPostComment,
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
