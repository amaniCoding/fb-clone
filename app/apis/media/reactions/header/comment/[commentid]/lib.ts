import prisma from "@/app/libs/prisma";
export const getGReactions = async (commentId: string) => {
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

  const gReactions = await prisma.mediaCommentReaction.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      commentId: commentId,
    },
  });

  const result = gReactions.map((rxn) => {
    return {
      reactionType: rxn.reactionType,
      count: rxn._count.reactionType,
    };
  });
  return {
    count: result.length,
    result,
  };
};
