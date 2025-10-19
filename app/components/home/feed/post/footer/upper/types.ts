import { Prisma } from "@/app/generated/prisma";

export type UpperFooter = {
  commentsCount: number;
  reactionsCount: number;
  reactions: Prisma.GetPostReactions_USERAggregateType<{
    _count: {
      reactionType: true;
    };
    where: {
      postId: string;
    };
  }>;
};
