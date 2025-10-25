import { Prisma, ReactionType } from "@/app/generated/prisma";

export type UpperFooter = {
  commentsCount: number;
  reactionsCount: number;
  reactions:
    | {
        reactionType: ReactionType;
        count: number;
        totalRows: number;
        totalPages: number;
        loading: boolean;
        page: number;
        error: string;
        reactors: never[];
      }[]
    | undefined;
  firstReactions: {
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
};
