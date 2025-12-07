import bcrypt from "bcryptjs";
export const verifyPassword = async (
  inputPassword: string,
  passworddB: string
) => await bcrypt.compare(inputPassword, passworddB);
