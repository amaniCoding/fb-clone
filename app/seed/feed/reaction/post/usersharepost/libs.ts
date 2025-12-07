import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getUsers } from "@/app/seed/libs";
import { ReactionType } from "@/app/generated/prisma/client";

export async function _seeder() {
  const posts = await prisma.userSharePost.findMany({
    select: {
      id: true,
    },
  });

  return Promise.all(
    posts.map(async (post) => {
      const users = await getUsers();

      return Promise.all(
        users.map((user) => {
          const reactionType = getRandomReactionType() as ReactionType;

          return prisma.userSharePost.update({
            where: {
              id: post.id,
            },
            data: {
              reactions: {
                create: {
                  reactionType: reactionType,
                  user: {
                    connect: {
                      id: user.id,
                    },
                  },
                },
              },
            },
          });
        })
      );
    })
  );
}
