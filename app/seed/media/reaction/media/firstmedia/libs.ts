import prisma from "@/app/libs/prisma";
import { getRandomReactionType } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";
import { ReactionType } from "@/app/generated/prisma/client";

export async function _seeder() {
  const user = await getRandomUser();
  const reactionType = getRandomReactionType() as ReactionType;

  const isReacted = await prisma.mediaReaction.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      mediaId: true,
    },
  });

  if (isReacted?.mediaId) {
    return;
  }
  return prisma.oUserPost.update({
    where: {
      id: "someid",
    },
    data: {
      medias: {
        update: {
          where: {
            id: "some_media_id_in_this_post",
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
}
