import { NextRequest } from "next/server";
import { getFeeds } from "./lib";
import { auth } from "@/app/libs/auth/auth";

type RouteType = {
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { page } = await params;
    const rowsPerPage = 10;

    const { count, updated } = await getFeeds(parseInt(page));

    const jsonResponse = {
      feeds: updated,
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
