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
            id: "4451bd54-0813-49de-acd0-a2ca452130e5",
          },
        },
      },
    });
  });
}
