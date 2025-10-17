import prisma from "../libs/prisma";

export default async function Page() {
  const users = await prisma.user.findMany();
  return <p>{users.length > 0 ? users[0].firstName : null}</p>;
}
