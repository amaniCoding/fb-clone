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
            id: "2b78f7a2-17ac-4fc3-a65f-9ab8edbb3b2f",
          },
        },
      },
    });
  });
}
