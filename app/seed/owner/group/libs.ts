import prisma from "@/app/libs/prisma";
import { groups } from "../../dummy";

export function _seeder() {
  return groups.map((group) => {
    return prisma.group.create({
      data: {
        name: group.name,
        profilePicture: group.profilePicture,
        superAdmin: {
          connect: {
            id: "27997fea-b319-45bf-854a-bf4b5222f70f",
          },
        },
      },
    });
  });
}
