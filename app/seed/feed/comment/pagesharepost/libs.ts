import prisma from "@/app/libs/prisma";
import { getRandomPostComment } from "@/app/seed/lib";
import {
  generateSinglePhoto,
  getRandomPostContentOption,
  getRandomUser,
} from "@/app/seed/libs";

export async function _seeder() {
  const posts = await prisma.pageSharePost.findMany({
    select: {
      id: true,
    },
  });

  return Promise.all(
    posts.map(async (post) => {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
      return prisma.pageSharePost.update({
        where: {
          id: post.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl:
                commentPostOption === "both" ||
                commentPostOption === "mediasonly"
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
      });
    })
  );
}
