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
          replies: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  reactions: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (post && post.comments[0].replies[0].replies[0].reactions.length > 0) {
    return;
  }

  return post
    ? Promise.all(
        post?.comments.map((co) => {
          return Promise.all(
            co.replies.map(async (rep) => {
              const users = await getUsers();
              return Promise.all(
                rep.replies.map((_rep) => {
                  return Promise.all(
                    users.map((user) => {
                      const reactionType =
                        getRandomReactionType() as ReactionType;

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
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      replies: {
                                        update: {
                                          where: {
                                            id: _rep.id,
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
              );
            })
          );
        })
      )
    : undefined;
}
