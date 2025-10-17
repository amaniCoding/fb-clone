import { z } from "zod";

export const userSchema = z
  .object({
    fname: z.string().min(1, "What is your name ?"),
    lname: z.string().min(1, "What is your name ?"),
    birthmonth: z.string(),
    birthday: z.string(),
    birthyear: z
      .string()
      .refine(
        (value) =>
          parseInt(value) !== new Date().getFullYear() &&
          new Date().getFullYear() - parseInt(value) >= 4,
        "It looks like you entered the wrong info. Please be sure to use your real birthday"
      ),
    gender: z.enum(["male", "female", "custom"], "Gender required"),
    customgender: z.string().optional(),
    customgenderpronoun: z.string(),
    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(
        6,
        "Enter a combination of atleast six numbers, letters and special characters like (&, !)"
      )
      .regex(
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
        "Enter a combination of atleast six numbers, letters and special characters like (&, !)"
      ),
  })
  .refine(
    (data) => data.customgenderpronoun !== "" || data.gender !== "custom",
    {
      path: ["customgenderpronoun"],
      message: "Please select your pronoun",
    }
  );

export type UserFormData = z.infer<typeof userSchema>;
