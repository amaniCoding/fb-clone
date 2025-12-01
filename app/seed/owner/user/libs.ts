import prisma from "@/app/libs/prisma";
import { users } from "../../dummy";
import { Gender } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";

export function _seeder() {
  const up1 = Promise.all(
    users.map((user) => {
      return prisma.user.create({
        data: {
          firstName: user.fname,
          lastName: user.lname,
          birthDate: user.birthDay,
          gender: user.gender as Gender,
          email: user.mobileOrPhoneNumber,
          password: bcrypt.hashSync(user.password, 10),
          Profile: {
            create: {
              profilePicture: user.profilepic,
            },
          },
        },
      });
    })
  );

  const up2 = prisma.user.create({
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

  return Promise.all([up1, up2]);
}
