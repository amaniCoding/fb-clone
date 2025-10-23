import { NextRequest } from "next/server";
import xprisma from "../../libs/prisma-ext";
import { getpost_users } from "./libs/user";

type RouteType = {
  page: number;
};

export async function GET(request: NextRequest, { page }: RouteType) {
  try {
    const rowsPerPage = 10;
    const { count, posts } = await getpost_users(page);

    //const x = await xprisma.post_USER.findFirst();

    const all = await Promise.all(posts);

    console.log(all.length);
    return Response.json({
      posts_user: all,
      totalRows: count,
      totalPages: Math.ceil(all.length / rowsPerPage),
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
