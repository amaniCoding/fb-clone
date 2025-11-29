"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "@/app/hooks/react/usereact";

export async function reactUserSharePostComment(
  prevState: State,
  id: string,
  commentId: string,
  reactionType: ReactionType
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const isCommentReacted = await prisma.userSharePost.findUnique({
      where: {
        id: id,
      },
      select: {
        comments: {
          where: {
            id: commentId,
          },
          select: {
            reactions: {
              where: {
                userId: session.user.id,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (isCommentReacted) {
      await prisma.userSharePost.update({
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
                  update: {
                    where: {
                      id: isCommentReacted.comments[0].reactions[0].id,
                    },
                    data: {
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
      });
    } else {
      await prisma.userSharePost.update({
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
      });
    }

    const gReactions = await prisma.commentReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        commentId: commentId,
      },
    });

    const _gReactions = gReactions.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });

    return {
      success: true,
      _gReactions: _gReactions,
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
