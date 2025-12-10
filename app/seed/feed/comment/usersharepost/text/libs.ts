import prisma from "@/app/libs/prisma";
import { getRandomPostComment } from "@/app/seed/lib";
import { getRandomUser } from "@/app/seed/libs";

export async function _seeder() {
  const posts = await prisma.userSharePost.findMany({
    select: {
      id: true,
    },
  });

  return Promise.all(
    posts.map(async (post) => {
      const user = await getRandomUser();
      const comment = getRandomPostComment();

      return prisma.userSharePost.update({
        where: {
          id: post.id,
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
      });
    })
  );
}
