import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.feedReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: commentId,
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

export const getReactors = async (
  feedId: string,
  commentId: string,
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

  const [count, comments] = await Promise.all([
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
            reactions: {
              take: 7,
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
                reactionType: true,
              },
            },
          },
        },
      },
    }),
  ]);

  const result = comments.map(async (co) => {
    return {
      ...co,
      _gReactions: await commentPreparer.prepareGReactions(co.id),
    };
  });

  return {
    count,
    result: await Promise.all(result),
  };
};
