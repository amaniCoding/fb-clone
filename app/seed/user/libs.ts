
import prisma from "@/app/libs/prisma";
import { users } from "../dummy";
import { Gender } from "@/app/generated/prisma";


export function _seeder() {
  return users.map((user) => {
    return prisma.user.create({
      data: {
        firstName: user.fname,
        lastName: user.lname,
        birthDate: user.birthDay,
        gender: user.gender as Gender,
        email: user.mobileOrPhoneNumber,
        password: user.password,
      },
    });
  });
}
