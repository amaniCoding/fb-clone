import { Prisma } from "@/app/generated/prisma";
import { Medias_USER, Post_USER } from "@/app/generated/prisma/client";

export interface PostsUser extends Post_USER {
  _count: {
    comments: number;
    reactions: number;
  };
  user: {
    firstName: string;
    lastName: string;
    Profile: {
      profilePicture: string | null;
    } | null;
  };
  medias: Medias_USER[];
  reactions_grouped:
    | (Prisma.PickEnumerable<
        Prisma.PostReactions_USERGroupByOutputType,
        "reactionType"[]
      > & {
        _count: {
          reactionType: number;
        };
      })[]
    | null;
}
