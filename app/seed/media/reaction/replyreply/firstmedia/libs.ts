import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";
import { ReactionType } from "@/app/generated/prisma/client";

export async function _seeder() {
  const post = await prisma.oUserPost.findUnique({
    where: {
      id: "someid",
    },
    select: {
      medias: {
        where: {
          id: "some_media_id_for_this_post",
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

  return post
    ? Promise.all(
        post?.medias[0].comments.map((co) => {
          return Promise.all(
            co.replies.map(async (rep) => {
              const user = await getRandomUser();
              const reactionType = getRandomReactionType() as ReactionType;
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.oUserPost.update({
                    where: {
                      id: "someid",
                    },
                    data: {
                      medias: {
                        update: {
                          where: {
                            id: "some_mediaid_for_this_post",
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
                        },
                      },
                    },
                  });
                })
              );
            })
          );
        })
      )
    : undefined;
}
