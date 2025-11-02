import { NextRequest } from "next/server";
import { getComments } from "./lib";

type RouteType = {
  page: string;
  feedid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { page, feedid } = await params;
    const rowsPerPage = 7;

    const { count, result } = await getComments(
      feedid,
      parseInt(page),
      rowsPerPage
    );

    const jsonResponse = {
      loading: false,
      error: "",
      page: 1,
      comments: result,
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
