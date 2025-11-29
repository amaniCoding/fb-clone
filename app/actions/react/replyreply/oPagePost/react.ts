"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";

export async function reactReplyReplyForOPagePost(
  id: string,
  commentId: string,
  replyId: string,
  replyReplyId: string,
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
        comments: {
          update: {
            where: {
              id: commentId,
            },
            data: {
              replies: {
                update: {
                  where: {
                    id: replyId,
                  },
                  data: {
                    replies: {
                      update: {
                        where: {
                          id: replyReplyId,
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
          },
        },
      },
      include: {
        comments: {
          where: {
            id: commentId,
          },
          select: {
            replies: {
              where: {
                id: replyId,
              },
              select: {
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const gReactionsForThisPostCommentReplyReply =
      await prisma.replyReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: post.comments[0].replies[0].replies[0].id,
        },
      });

    return {
      success: true,
      _gReactions: gReactionsForThisPostCommentReplyReply,
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
