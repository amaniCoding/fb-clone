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
            id: "4451bd54-0813-49de-acd0-a2ca452130e5",
          },
        },
      },
    });
  });
}
