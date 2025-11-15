import prisma from "@/app/libs/prisma";
import { pages } from "../dummy";
import bcrypt from "bcryptjs/umd/types";

export function _seeder() {
  return pages.map((page) => {
    return prisma.page.create({
      data: {
        name: page.name,
        profilePicture: page.profilePicture,
        admin: {
          create: {
            firstName: "Amanuel",
            lastName: "Ferede",
            birthDate: new Date(),
            gender: "male",
            email: "amanuelfrm@gmail.com",
            password: bcrypt.hashSync("faker.js", 10),
          },
        },
      },
    });
  });
}
