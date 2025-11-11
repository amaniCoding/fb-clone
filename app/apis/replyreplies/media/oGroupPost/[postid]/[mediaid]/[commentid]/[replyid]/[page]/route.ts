import { NextRequest } from "next/server";
import { getReplies } from "./lib";

type RouteType = {
  postid: string;
  mediaid: string;
  commentid: string;
  replyid: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid, mediaid, commentid, replyid, page } = await params;
    const rowsPerPage = 7;

    const { count, result } = await getReplies(
      postid,
      mediaid,
      commentid,
      replyid,
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
