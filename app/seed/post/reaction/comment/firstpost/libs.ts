import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

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
          const user = await getRandomUser();
          const reactionType = getRandomReactionType() as ReactionType;
          const isReacted = await prisma.commentReaction.findFirst({
            where: {
              commentId: co.id,
            },
            select: {
              commentId: true,
            },
          });
          if (isReacted?.commentId) {
            return;
          }

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
      )
    : undefined;
}
