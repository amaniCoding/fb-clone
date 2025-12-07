import { PostType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";
export const getGreactionsForPost = async (
  postType: PostType,
  postId: string
) => {
  if (postType === "oUserPost") {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        userPostId: postId,
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
  }

  if (postType === "userSharePost") {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        userSharePostId: postId,
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
  }
  if (postType === "oPagePost") {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        pagePostId: postId,
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
  }
  if (postType === "pageSharePost") {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        pageSharePostId: postId,
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
  }
  if (postType === "oGroupPost") {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        groupPostId: postId,
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
  }
  if (postType === "toGroupSharedPost") {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        toGroupSharePostId: postId,
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
  }
  return {
    reactors: [],
  };
};

export const getGreactionsForComment = async (commentId: string) => {
  const r = await prisma.commentReaction.groupBy({
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

export const getGreactionsForReply = async (replyId: string) => {
  const r = await prisma.replyReaction.groupBy({
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

export const getGreactionsForReplyReply = async (replyReplyId: string) => {
  const r = await prisma.replyReplyReactions.groupBy({
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
    gReactions: gReactions,
  };
};

const result = await getGreactionsForPost("oUserPost", "postId");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gReactions = result?.gReactions;

export type GReactionsType = typeof gReactions;
