import { NextRequest } from "next/server";
import { getComments } from "./lib";

type RouteType = {
  page: string;
  feedid: string;
  postid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { page, feedid, postid } = await params;
    const rowsPerPage = 7;

    const { count, comments } = await getComments(
      feedid,
      postid,
      parseInt(page),
      rowsPerPage
    );

    const jsonResponse = {
      loading: false,
      error: "",
      page: 1,
      comments: comments,
      totalRows: count,
      totalPages: Math.ceil(count! / rowsPerPage),
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
