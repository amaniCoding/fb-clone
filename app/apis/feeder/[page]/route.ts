import { NextRequest } from "next/server";
import { getFeeds, prepareFeeds } from "./handler";

type RouteType = {
  page: number;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const rowsPerPage = 10;

    const { count, feeds } = await prepareFeeds(parseInt(page));
    const _feeds = await Promise.all(feeds);

    const jsonResponse = {
      loading: false,
      error: "",
      page: 1,
      feeds,
      _feeds,
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
