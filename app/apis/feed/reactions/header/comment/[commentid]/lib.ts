import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

export const getReactions = async (commentId: string) => {
  const gReactions = await prisma.feedCommentReaction.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      id: commentId,
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
