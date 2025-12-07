import prisma from "@/app/libs/prisma";
import { getRandomCommentReply } from "@/app/seed/lib";
import {
  generateSinglePhoto,
  getRandomPostContentOption,
  getRandomUser,
} from "@/app/seed/libs";

export async function _seeder() {
  const post = await prisma.oUserPost.findUnique({
    where: {
      id: "someid",
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

            const replyPostOption = getRandomPostContentOption() as
              | "contentonly"
              | "mediasonly"
              | "both";
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
                        update: {
                          where: {
                            id: rep.id,
                          },

                          data: {
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generateSinglePhoto()
                                    : null,
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
