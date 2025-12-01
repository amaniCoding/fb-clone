import prisma from "@/app/libs/prisma";

export async function _remove() {
  const r1 = prisma.oUserPost.deleteMany({});
  const r2 = prisma.userSharePost.deleteMany({});
  const r3 = prisma.oPagePost.deleteMany({});
  const r4 = prisma.pageSharePost.deleteMany({});
  const r5 = prisma.oGroupPost.deleteMany({});
  const r6 = prisma.toGroupSharePost.deleteMany({});
  const r7 = prisma.comment.deleteMany({});

  return await Promise.all([r1, r2, r3, r4, r5, r6, r7]);
}
