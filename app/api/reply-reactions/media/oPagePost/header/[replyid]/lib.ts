import prisma from "@/app/libs/prisma";
export const getReactions = async (replyId: string) => {
  const r = await prisma.mediaReplyReactions.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      id: replyId,
    },
  });

  const gReactions = r.map((rxn) => {
    return {
      reactionType: rxn.reactionType,
      count: rxn._count.reactionType,
    };
  });
  return {
    result: gReactions,
  };
};
