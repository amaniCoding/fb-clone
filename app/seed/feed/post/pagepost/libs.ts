import prisma from "@/app/libs/prisma";
import {
  generatePhoto,
  getRandomPage,
  getRandomPhotoCount,
  getRandomPostContentOption,
  getRandomPostText,
  getRandomPostType,
} from "@/app/seed/libs";

export async function _seeder() {
  const page = await getRandomPage();
  const postType = getRandomPostType();
  const postContentOption = getRandomPostContentOption();
  return await prisma.feed.create({
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

              content:
                postContentOption === "contentonly" ||
                postContentOption === "both"
                  ? getRandomPostText()
                  : null,
              medias:
                postContentOption === "both" ||
                postContentOption === "mediasonly"
                  ? {
                      createMany: {
                        data: generatePhoto("page", getRandomPhotoCount()),
                      },
                    }
                  : undefined,
            },
          },
        },
      },
    },
  });
}
