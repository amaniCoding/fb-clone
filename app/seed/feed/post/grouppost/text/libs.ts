import prisma from "@/app/libs/prisma";
import {
  getRandomUser,
  getRandomGroup,
  getRandomPostText,
} from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();
  const group = await getRandomGroup();
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

              content: getRandomPostText(),

              medias: undefined,
            },
          },
        },
      },
    },
  });
}
