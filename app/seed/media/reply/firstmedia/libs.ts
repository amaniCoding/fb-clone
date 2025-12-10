import prisma from "@/app/libs/prisma";
import { getRandomCommentReply } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

export async function _seeder() {
  const post = await prisma.oUserPost.findUnique({
    where: {
      id: "someid",
    },
    select: {
      medias: {
        where: {
          id: "media_id_for_this_post",
        },
        select: {
          comments: {
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
        post?.medias[0].comments.map(async (co) => {
          const user = await getRandomUser();
          const reply = getRandomCommentReply();

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
          });
        })
      )
    : undefined;
}
