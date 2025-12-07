import { ReactionType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

export async function _seeder() {
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
  return prisma.oUserPost.update({
    where: {
      id: "someid",
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
}
