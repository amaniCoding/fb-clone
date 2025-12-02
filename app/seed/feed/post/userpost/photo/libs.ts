import prisma from "@/app/libs/prisma";
import {
  generatePhoto,
  getRandomPhotoCount,
  getRandomUser,
} from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();

  return prisma.feed.create({
    data: {
      postType: "user",
      userPost: {
        create: {
          postType: "original",
          oUserPost: {
            create: {
              user: {
                connect: { id: user.id },
              },

              content: null,

              medias: {
                createMany: {
                  data: generatePhoto("user", getRandomPhotoCount()),
                },
              },
            },
          },
        },
      },
    },
  });
}
