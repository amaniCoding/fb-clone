import prisma from "@/app/libs/prisma";
import bcrypt from "bcryptjs";

export async function create() {
  await prisma.user.create({
    data: {
      firstName: "Amanuel",
      lastName: "Ferede",

      birthDate: new Date(),
      gender: "male",
      email: "amanuelfrm@gmail.com",
      password: bcrypt.hashSync("faker.js", 10),
      Profile: {
        create: {
          profilePicture: "/ad/aman.jpg",
        },
      },
    },
  });
}
