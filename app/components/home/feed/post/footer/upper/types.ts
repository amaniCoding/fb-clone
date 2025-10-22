import { Prisma } from "@/app/generated/prisma";

export type UpperFooter = {
  commentsCount: number;
  reactionsCount: number;
  reactions:
    | (Prisma.PickEnumerable<
        Prisma.PostReactions_USERGroupByOutputType,
        "reactionType"[]
      > & {
        _count: {
          reactionType: number;
        };
      })[]
    | null;
};
