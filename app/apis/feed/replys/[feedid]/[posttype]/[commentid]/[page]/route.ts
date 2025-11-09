import { NextRequest } from "next/server";
import { getReplies } from "./lib";

type RouteType = {
  feedid: string;
  posttype: string;
  commentid: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const rowsPerPage = 7;

    const { feedid, posttype, commentid, page } = await params;

    const { count, result } = await getReplies(
      feedid,
      posttype as "original" | "share",
      commentid,
      parseInt(page),
      rowsPerPage
    );

    const jsonResponse = {
      result,
      totalRows: count ? count : 0,
      totalPages: Math.ceil(count ? count / rowsPerPage : 0),
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
