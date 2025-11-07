import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

export const getReactions = async (feedId: string, postId: string) => {
  const feed = await prisma.feed.findUnique({
    where: {
      id: feedId,
    },
    select: {
      postType: true,
    },
  });
  switch (feed?.postType) {
    case "user": {
      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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
    }

    case "page": {
      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          pagePostId: postId,
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
    }

    case "group": {
      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          groupPostId: postId,
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
    }

    case "ushare": {
      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userSharePostId: postId,
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
    }

    case "pshare": {
      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          pageSharePostId: postId,
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
    }

    case "gshare": {
      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          toGroupSharePostId: postId,
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
    }

    default:
      return {
        count: 0,
        result: [],
      };
  }
};
