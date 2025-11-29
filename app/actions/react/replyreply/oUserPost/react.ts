"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "@/app/hooks/react/usereact";

export async function reactReplyReplyForOUserPost(
  prevState: State,
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
    const isReplyReplyReacted = await prisma.oUserPost.findUnique({
      where: {
        id: id,
      },
      select: {
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
            },
          },
        },
      },
    });

    if (isReplyReplyReacted) {
      await prisma.oUserPost.update({
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
                              update: {
                                where: {
                                  id: isReplyReplyReacted.comments[0].replies[0]
                                    .replies[0].reactions[0].id,
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
                  },
                },
              },
            },
          },
        },
      });
    } else {
      await prisma.oUserPost.update({
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
      });
    }

    const gReactions = await prisma.replyReplyReactions.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        replyReplyId: replyReplyId,
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
