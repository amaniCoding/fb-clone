import prisma from "@/app/libs/prisma";
import { ReplyType, ReplyReplyType } from "../../handler";
import { ReactionModalHeader, ReactionModalReactors } from "../../types";

export const feedPreparer = {
  prepareComments: (comments: any[]) => {
    const rowsPerPage = 7;
    return comments.map(async (comment) => {
      return {
        ...comment,
        modal: {
          totalRows: 1,
          totalPages: Math.ceil(6 / rowsPerPage),
          loading: true,
          page: 1,
          error: "",
          commentors: [],
        },
        gReactions: await commentPreparer.prepareGReactions(comment.id),
        reactions: commentPreparer.prepareReactions(comment.reactions),
        replies: commentPreparer.prepareReplies(comment.replies),
      };
    });
  },

  prepareReactions: (
    reactions: {
      user: {
        firstName: string;
        lastName: string;
      };
    }[]
  ) => {
    return reactions.map((rxn) => {
      return {
        ...rxn,
        modal: {
          header: {
            currentReactionType: undefined,
            loading: false,
            reactions: [] as ReactionModalHeader[],
          },
          reactors: [] as ReactionModalReactors[],
        },
      };
    });
  },

  prepareGReactions: async (feedId: string) => {
    try {
      const r = await prisma.feedReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: feedId,
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

export const commentPreparer = {
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
  prepareReactions: (
    reactions: {
      user: {
        firstName: string;
        lastName: string;
      };
    }[]
  ) => {
    return reactions.map((rxn) => {
      return {
        ...rxn,
        modal: {
          header: {
            currentReactionType: undefined,
            loading: false,
            reactions: [] as ReactionModalHeader[],
          },
          reactors: [] as ReactionModalReactors[],
        },
      };
    });
  },

  prepareReplies: (replies: ReplyType) => {
    return replies.map((reply) => {
      return {
        ...reply,
        modal: {
          totalRows: undefined,
          totalPages: undefined,
          loading: true,
          page: 1,
          error: "",
          repliers: [],
        },
        reactions: replyPreparer.prepareReactions(reply.reactions),
        replies: replyPreparer.prepareReplies(reply.replies),
      };
    });
  },
};

export const replyPreparer = {
  prepareGReactions: async (replyId: string) => {
    try {
      const r = await prisma.feedReaction.groupBy({
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
  prepareReactions: (
    reactions: {
      user: {
        firstName: string;
        lastName: string;
      };
    }[]
  ) => {
    return reactions.map((rxn) => {
      return {
        ...rxn,
        modal: {
          header: {
            currentReactionType: undefined,
            loading: false,
            reactions: [] as ReactionModalHeader[],
          },
          reactors: [] as ReactionModalReactors[],
        },
      };
    });
  },

  prepareReplies: (replies: ReplyReplyType) => {
    return replies.map((reply) => {
      return {
        ...reply,
        modal: {
          totalRows: undefined,
          totalPages: undefined,
          loading: true,
          page: 1,
          error: "",
          repliers: [],
        },
        reactions: replyReplyPreparer.prepareReactions(reply.reactions),
      };
    });
  },
};

export const replyReplyPreparer = {
  prepareGReactions: async (rrId: string) => {
    try {
      const r = await prisma.feedReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: rrId,
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
  prepareReactions: (
    reactions: {
      user: {
        firstName: string;
        lastName: string;
      };
    }[]
  ) => {
    return reactions.map((rxn) => {
      return {
        ...rxn,
        modal: {
          header: {
            currentReactionType: undefined,
            loading: false,
            reactions: [] as ReactionModalHeader[],
          },
          reactors: [] as ReactionModalReactors[],
        },
      };
    });
  },
};
