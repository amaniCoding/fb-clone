import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

export const getReactions = async (feedId: string) => {
  const gReactions = await prisma.feedReaction.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      id: feedId,
    },
  });

  const result = gReactions.map((rxn) => {
    return {
      reactionType: rxn.reactionType,
      count: rxn._count.reactionType,
    };
  });
  return {
    result,
  };
};
