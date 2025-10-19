import { Medias_USER, Post_USER, Prisma, User } from "@/app/generated/prisma";

export interface PostsUser extends Post_USER {
  comments_count: number;
  reactions_count: number;
  reactions_grouped: Prisma.GetPostReactions_USERAggregateType<{
    _count: {
      reactionType: true;
    };
    where: {
      postId: string;
    };
  }>;
  medias: Medias_USER[];
  user: User;
}
