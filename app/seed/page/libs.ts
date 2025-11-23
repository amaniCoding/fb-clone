import prisma from "@/app/libs/prisma";
import { pages } from "../dummy";

export function _seeder() {
  return pages.map((page) => {
    return prisma.page.create({
      data: {
        name: page.name,
        profilePicture: page.profilePicture,
        admin: {
          connect: {
            id: "b6301af3-34a2-4d63-92fe-f66f1197f925",
          },
        },
      },
    });
  });
}
