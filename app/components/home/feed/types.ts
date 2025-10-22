import { Medias_USER, Post_USER, User } from "@/app/generated/prisma";
import { PickEnumerable } from "@/app/generated/prisma/internal/prismaNamespace";
import { PostReactions_USERGroupByOutputType } from "@/app/generated/prisma/models";

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
    | (PickEnumerable<PostReactions_USERGroupByOutputType, "reactionType"[]> & {
        _count: {
          reactionType: number;
        };
      })[]
    | null;
}
