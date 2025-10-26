import { NextRequest } from "next/server";
import xprisma from "../../../libs/prisma-ext";
import { getpost_users } from "./libs/user";

type RouteType = {
  page: number;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: number }> }
) {
  try {
    const { page } = await params;
    const rowsPerPage = 10;
    console.log("PAGEGGE", page);
    const { count, posts_user } = await getpost_users(page);

    //const x = await xprisma.post_USER.findFirst();

    const userPosts = await Promise.all(posts_user);

    const feeds = [...userPosts];
    const jsonResponse = {
      loading: false,
      error: "",
      page: 1,
      feeds,
      totalRows: count,
      totalPages: Math.ceil(count / rowsPerPage),
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
