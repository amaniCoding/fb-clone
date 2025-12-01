import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

export async function _seeder() {
  const posts = await prisma.toGroupSharePost.findMany({
    select: {
      id: true,
    },
  });

  return Promise.all(
    posts.map(async (post) => {
      const user = await getRandomUser();
      const reactionType = getRandomReactionType() as ReactionType;
      const isReacted = await prisma.reaction.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          userPostId: true,
        },
      });

      if (isReacted?.userPostId) {
        return;
      }
      return prisma.toGroupSharePost.update({
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
}
