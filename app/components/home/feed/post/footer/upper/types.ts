import { PickEnumerable } from "@/app/generated/prisma/internal/prismaNamespace";
import { PostReactions_USERGroupByOutputType } from "@/app/generated/prisma/models";

export type UpperFooter = {
  commentsCount: number;
  reactionsCount: number;
  reactions: (PickEnumerable<
    PostReactions_USERGroupByOutputType,
    "reactionType"[]
  > & {
    _count: {
      reactionType: number;
    };
  })[];
};
