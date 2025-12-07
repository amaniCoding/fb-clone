import { PostType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";

export const getGreactionsForMedia = async (
  postType: PostType,
  mediaId: string
) => {
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
    gReactions,
  };
};

export const getGreactionsForMediaComment = async (commentId: string) => {
  const r = await prisma.mediaCommentReaction.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      commentId: commentId,
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

export const getGreactionsForMediaReply = async (replyId: string) => {
  const r = await prisma.mediaReplyReactions.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      replyId: replyId,
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

export const getGreactionsForMediaReplyReply = async (replyReplyId: string) => {
  const r = await prisma.mediaReplyReplyReactions.groupBy({
    by: ["reactionType"],
    _count: {
      reactionType: true,
    },
    where: {
      replyReplyId: replyReplyId,
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
