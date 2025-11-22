import prisma from "@/app/libs/prisma";
import { groups } from "../dummy";

export function _seeder() {
  return groups.map((group) => {
    return prisma.group.create({
      data: {
        name: group.name,
        profilePicture: group.profilePicture,
        superAdmin: {
          connect: {
            id: "925f3f0c-b6ab-4192-826f-5bd82e160a4c",
          },
        },
      },
    });
  });
}
