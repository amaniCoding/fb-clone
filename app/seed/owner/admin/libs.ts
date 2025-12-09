import prisma from "@/app/libs/prisma";

export function _seeder() {
  const udpate = prisma.user.update({
    where: {
      id: "27997fea-b319-45bf-854a-bf4b5222f70f",
    },
    data: {
      Profile: {
        update: {
          where: {
            userId: "27997fea-b319-45bf-854a-bf4b5222f70f",
          },
          data: {
            profilePicture: "/ad/aman.jpg",
          },
        },
      },
    },
  });
  return udpate;
}
