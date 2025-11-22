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
            id: "925f3f0c-b6ab-4192-826f-5bd82e160a4c",
          },
        },
      },
    });
  });
}
