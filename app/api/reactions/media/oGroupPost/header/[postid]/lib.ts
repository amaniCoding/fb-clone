import prisma from "@/app/libs/prisma";
export const getReactions = async (mediaId: string) => {
  const r = await prisma.mediaReaction.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      mediaId: mediaId,
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
