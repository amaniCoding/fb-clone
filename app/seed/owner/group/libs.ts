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
            id: "b6301af3-34a2-4d63-92fe-f66f1197f925",
          },
        },
      },
    });
  });
}
