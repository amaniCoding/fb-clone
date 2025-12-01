"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "../../../types";

export async function reactOUserPostMediaComment(
  id: string,
  mediaId: string,
  commentId: string,
  reactionType: ReactionType,
  prevState: State
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const isMediaCommentReacted = await prisma.oUserPost.findUnique({
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
    });

    if (isMediaCommentReacted?.medias[0].comments[0].reactions[0].id) {
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
                      reactions: {
                        update: {
                          where: {
                            id: isMediaCommentReacted.medias[0].comments[0]
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
      });
    }

    const gReactions = await prisma.mediaCommentReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        commentId,
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
      message: "Success ",
      reactionType,
    };
  } catch (error) {
    return {
      success: true,
      _gReactions: [],
      message: "Failed ",
      reactionType: undefined,
    };
  }
}
