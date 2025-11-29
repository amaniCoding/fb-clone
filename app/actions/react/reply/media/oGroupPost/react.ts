"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "@/app/hooks/react/usereact";

export async function reactReplyForOGroupPostMedia(
  prevState: State,
  id: string,
  mediaId: string,
  commentId: string,
  replyId: string,
  reactionType: ReactionType
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const isReplyMediaReacted = await prisma.oGroupPost.findUnique({
      where: {
        id: id,
      },
      select: {
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
                replies: {
                  where: {
                    id: replyId,
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

    if (isReplyMediaReacted?.medias[0].comments[0].replies[0].reactions[0].id) {
      await prisma.oGroupPost.update({
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
                      replies: {
                        update: {
                          where: {
                            id: replyId,
                          },
                          data: {
                            reactions: {
                              update: {
                                where: {
                                  id: isReplyMediaReacted.medias[0].comments[0]
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
      await prisma.oGroupPost.update({
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
                      replies: {
                        update: {
                          where: {
                            id: replyId,
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

    const gReactions = await prisma.mediaReplyReactions.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        replyId: replyId,
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
