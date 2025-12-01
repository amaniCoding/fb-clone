import prisma from "@/app/libs/prisma";
import {
  getRandomUser,
  getRandomGroup,
  getRandomPostContentOption,
  getRandomPostText,
  generatePhoto,
  getRandomPhotoCount,
} from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();
  const group = await getRandomGroup();
  const postContentOption = getRandomPostContentOption();
  return prisma.feed.create({
    data: {
      postType: "group",
      groupPost: {
        create: {
          postType: "original",
          oGroupPost: {
            create: {
              user: {
                connect: { id: user.id },
              },
              group: {
                connect: { id: group.id },
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
                        data: generatePhoto("group", getRandomPhotoCount()),
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
