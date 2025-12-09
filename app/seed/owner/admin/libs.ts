import prisma from "@/app/libs/prisma";

export async function _seeder() {
  await prisma.user.update({
    where: {
      id: "27997fea-b319-45bf-854a-bf4b5222f70f",
    },
    data: {
      Profile: {
        update: {
          profilePicture: "/ad/aman.jpg",
        },
      },
    },
  });
}
