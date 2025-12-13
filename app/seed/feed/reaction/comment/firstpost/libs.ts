import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getUsers } from "@/app/seed/libs";
import { ReactionType } from "@/app/generated/prisma/client";

export async function _seeder() {
  const post = await prisma.oUserPost.findUnique({
    where: {
      id: "168136ed-3a69-494b-b21c-5152d5e48baa",
    },
    select: {
      comments: {
        select: {
          id: true,
        },
      },
    },
  });

  return post
    ? Promise.all(
        post?.comments.map(async (co) => {
          const users = await getUsers();

          return Promise.all(
            users.map((user) => {
              const reactionType = getRandomReactionType() as ReactionType;

              return prisma.oUserPost.update({
                where: {
                  id: "168136ed-3a69-494b-b21c-5152d5e48baa",
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
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
                    },
                  },
                },
              });
            })
          );
        })
      )
    : undefined;
}
