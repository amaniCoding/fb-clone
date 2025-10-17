import { prisma } from "../libs/prisma";

export async function GET() {
  try {
    const posts_users = await prisma.post_USER.findMany({
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
