import prisma from "@/app/libs/prisma";
import { getRandomPostComment } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();
  const comment = getRandomPostComment();

  return await prisma.oUserPost.update({
    where: {
      id: "someid",
    },
    data: {
      medias: {
        update: {
          where: {
            id: "media_id_in_this_post",
          },
          data: {
            comments: {
              create: {
                content: comment,

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
