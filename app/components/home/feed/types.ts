import { Medias_USER, Post_USER, User } from "@/app/generated/prisma";

export interface PostsUser extends Post_USER {
  medias: Medias_USER[];
  user: User;
}
