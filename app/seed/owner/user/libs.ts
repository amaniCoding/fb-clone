import prisma from "@/app/libs/prisma";

import bcrypt from "bcryptjs";
import { Gender } from "@/app/generated/prisma/client";
import { users } from "../../dummy";

export async function _seeder() {
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

  return await up1;
}
