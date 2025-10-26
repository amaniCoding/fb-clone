import { ReactionType } from "@/app/generated/prisma";

export type UpperFooter = {
  commentsCount: number;
  reactionsCount: number;
  groupedReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;
  firstReactions: {
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
};
