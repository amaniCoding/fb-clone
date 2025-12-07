import prisma from "../libs/prisma";

export default async function Page() {
  const users = await prisma.user.findMany({});
  if (users.length > 0) {
    return <div>{users[0].firstName}</div>;
  }
  return <div>No User</div>;
}
