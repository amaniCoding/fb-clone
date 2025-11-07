import { NextRequest } from "next/server";
import { getReactors } from "./lib";

type RouteType = {
  feedid: string;
  postid: string;
  commentid: string;
  replyid: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const rowsPerPage = 7;

    const { feedid, postid, commentid, replyid, page } = await params;

    const { count, reactors } = await getReactors(
      feedid,
      postid,
      commentid,
      replyid,
      parseInt(page),
      rowsPerPage
    );

    const jsonResponse = {
      reactors,
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
