import prisma from "@/app/libs/prisma";
import { pages } from "../../dummy";

export function _seeder() {
  return pages.map((page) => {
    return prisma.page.create({
      data: {
        name: page.name,
        profilePicture: page.profilePicture,
        admin: {
          connect: {
            id: "27997fea-b319-45bf-854a-bf4b5222f70f",
          },
        },
      },
    });
  });
}
