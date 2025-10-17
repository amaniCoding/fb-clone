import prisma from "../libs/prisma";

export default async function Page() {
  const users = await prisma.user.findMany();
  return <p>{users[0].firstName}</p>;
}
