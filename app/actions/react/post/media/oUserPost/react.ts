"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "../../../types";

export async function reactOUserPostMedia(
  id: string,
  mediaId: string,
  reactionType: ReactionType,
  prevState: State
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un aauthorized request");
    }

    const isMediaReacted = await prisma.oUserPost.findUnique({
      where: {
        id: id,
      },
      select: {
        medias: {
          where: {
            id: mediaId,
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

    if (isMediaReacted?.medias[0].reactions[0].id) {
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
                reactions: {
                  update: {
                    where: {
                      id: isMediaReacted.medias[0].reactions[0].id,
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

    const gReactions = await prisma.mediaReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        mediaId: mediaId,
      },
    });

    const _gReactionsForThisPost = gReactions.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });

    return {
      success: true,
      _gReactions: _gReactionsForThisPost,
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
