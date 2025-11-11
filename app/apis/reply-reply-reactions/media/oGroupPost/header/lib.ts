import prisma from "@/app/libs/prisma";
export const getReactions = async (replyReplyId: string) => {
  const r = await prisma.mediaReplyReplyReactions.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      id: replyReplyId,
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
