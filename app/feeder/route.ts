import prisma from "../libs/prisma";
import { prismaEXT_POST_USER } from "../libs/prisma-ext";

export async function GET() {
  try {
    const posts_users = await prismaEXT_POST_USER.post_USER.findMany({
      include: {
        medias: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //await seedUser();
    return Response.json({ posts_user: posts_users });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
