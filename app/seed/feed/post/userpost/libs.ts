import { MediaOwnerType, MediaType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { dummyTexts } from "@/app/seed/dummy";
import {
  generatePhoto,
  getRandomPhotoCount,
  getRandomPostContentOption,
  getRandomPostText,
  getRandomUser,
} from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();

  const postContentOption = getRandomPostContentOption();
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
                        data: generatePhoto("user", getRandomPhotoCount()),
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
