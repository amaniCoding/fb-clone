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
            id: "2b78f7a2-17ac-4fc3-a65f-9ab8edbb3b2f",
          },
        },
      },
    });
  });
}
