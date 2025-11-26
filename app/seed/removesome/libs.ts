import prisma from "@/app/libs/prisma";

export async function _remove() {
  await prisma.comment.deleteMany({});
}
