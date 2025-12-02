"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "../../../types";

export async function reactReplyReplyForOUserPostMedia(
  id: string,
  mediaId: string,
  commentId: string,
  replyId: string,
  replyReplyId: string,
  reactionType: ReactionType,
  prevState: State
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un aauthorized request");
    }
    const isMediaReplyReplyReacted = await prisma.oUserPost.findUnique({
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
        },
      },
    });

    if (isMediaReplyReplyReacted) {
      await prisma.oUserPost.update({
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
                            replies: {
                              update: {
                                where: {
                                  id: replyReplyId,
                                },
                                data: {
                                  reactions: {
                                    update: {
                                      where: {
                                        id: isMediaReplyReplyReacted.medias[0]
                                          .comments[0].replies[0].replies[0]
                                          .reactions[0].id,
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
            },
          },
        },
      });
    }

    const gReactions = await prisma.mediaReplyReplyReactions.groupBy({
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
