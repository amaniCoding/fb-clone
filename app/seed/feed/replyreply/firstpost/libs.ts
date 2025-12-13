import prisma from "@/app/libs/prisma";
import { getRandomCommentReply } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

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
            },
          },
        },
      },
    },
  });

  return post
    ? Promise.all(
        post?.comments.map((co) => {
          co.replies.map(async (rep) => {
            const user = await getRandomUser();
            const reply = getRandomCommentReply();

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
                              create: {
                                content: reply,

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
            });
          });
        })
      )
    : undefined;
}
