import prisma from "@/app/libs/prisma";
import { groups } from "../dummy";
import bcrypt from "bcryptjs/umd/types";

export function _seeder() {
  return groups.map((group) => {
    return prisma.group.create({
      data: {
        name: group.name,
        profilePicture: group.profilePicture,
        superAdmin: {
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
