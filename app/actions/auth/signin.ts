"use server";

import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "The email or mobile number you entered is not connected to an account. Find your account and log in";
        case "CallbackRouteError":
          return "The email or mobile number you entered is not connected to an account. Find your account and log in";

        default:
          return "Something went wrong";
      }
    }
  }
  revalidatePath("/");
  redirect("/");
}
