import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

const ReactionsPreparer = {
  prepareGReactions: async (replyId: string) => {
    try {
      const r = await prisma.feedReplyReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: replyId,
        },
      });

      return r.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });
    } catch (error) {}
  },
};

export const getReplies = async (
  feedId: string,
  commentId: string,
  replyId: string,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  /**
   * comments include
   * first reactors
   * first replier
   * g reactions
   * count reactions and replies
   * commentors withonly name with profile pic
   * prepare reactions for modal --- future
   * prepare replies for modal --- future
   */

  const [count, replies] = await Promise.all([
    prisma.feed.count(),
    prisma.feed.findMany({
      where: {
        id: feedId,
      },

      select: {
        id: true,
        comments: {
          where: {
            id: commentId,
          },
          select: {
            id: true,
            replies: {
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyId,
                  },
                  take: rowsPerPage,
                  skip: skip,
                  select: {
                    user: {
                      select: {
                        firstName: true,
                        lastName: true,
                        Profile: {
                          select: {
                            profilePicture: true,
                          },
                        },
                      },
                    },
                    reactions: {
                      select: {
                        user: {
                          select: {
                            firstName: true,
                            lastName: true,
                            Profile: {
                              select: {
                                profilePicture: true,
                              },
                            },
                          },
                        },
                      },
                      orderBy: {
                        createdAt: "desc",
                      },
                      take: 1,
                    },
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  ]);

  const result = replies.map(async (co) => {
    return {
      ...co,
      _gReactions: await ReactionsPreparer.prepareGReactions(co.id),
    };
  });

  return {
    count,
    result: await Promise.all(result),
  };
};
