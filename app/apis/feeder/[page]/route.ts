import { NextRequest } from "next/server";
import { getFeeds } from "./lib";

type RouteType = {
  page: string;
  feedid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
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
