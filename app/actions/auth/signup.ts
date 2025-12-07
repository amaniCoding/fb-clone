"use server";

import prisma from "@/app/libs/prisma";
import { UserFormData } from "@/app/libs/user-schema";
import bcrypt from "bcryptjs";

export async function signUp(formData: UserFormData) {
  try {
    const newBirthDate = parseInt(formData.birthday) + 1;
    const birthDateString = `${formData.birthyear}-${formData.birthmonth}-${newBirthDate}`;

    const birthDate = new Date(birthDateString);
    const existingUser = await prisma.user.findFirst({
      where: {
        email: formData.email,
      },
    });

    if (existingUser) {
      return {
        errors: {
          email: "Email you provided already taken",
        },
      };
    }
    const user = await prisma.user.create({
      data: {
        firstName: formData.fname,
        lastName: formData.lname,
        birthDate: birthDate,
        gender: formData.gender,
        customGender: formData.customgender ? formData.customgender : null,
        customGenderPronoun: formData.customgenderpronoun
          ? formData.customgenderpronoun
          : null,
        email: formData.email,
        password: await bcrypt.hash(formData.password, 10),
      },
    });

    if (user) {
      return {
        success: true,
        id: user.id,
        message: "success",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error",
    };
  }
}
