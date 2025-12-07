import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getUsers } from "@/app/seed/libs";
import { ReactionType } from "@/app/generated/prisma/client";

export async function _seeder() {
  const post = await prisma.oUserPost.findUnique({
    where: {
      id: "someid",
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
                  id: "someid",
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
