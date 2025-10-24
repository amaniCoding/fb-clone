import { NextRequest } from "next/server";
import xprisma from "../../../libs/prisma-ext";
import { getpost_users } from "./libs/user";

type RouteType = {
  page: number;
};

export async function GET(request: NextRequest, { page }: RouteType) {
  try {
    const rowsPerPage = 10;
    const { count, posts_user } = await getpost_users(page);

    //const x = await xprisma.post_USER.findFirst();

    const u = await Promise.all(posts_user);

    const feeds = [...u];

    console.log(u.length);
    return Response.json({
      feeds: feeds,
      totalRows: feeds.length,
      totalPages: Math.ceil(feeds.length / rowsPerPage),
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
