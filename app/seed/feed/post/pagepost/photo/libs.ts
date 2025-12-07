import prisma from "@/app/libs/prisma";
import {
  generatePhoto,
  getRandomPage,
  getRandomPhotoCount,
} from "@/app/seed/libs";

export async function _seeder() {
  const page = await getRandomPage();
  return prisma.feed.create({
    data: {
      postType: "page",
      pagePost: {
        create: {
          postType: "original",
          oPagePost: {
            create: {
              page: {
                connect: { id: page.id },
              },

              content: null,

              medias: {
                createMany: {
                  data: generatePhoto("page", getRandomPhotoCount()),
                },
              },
            },
          },
        },
      },
    },
  });
}
