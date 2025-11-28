import { NextRequest } from "next/server";
import { getReplies, ReplyType } from "./lib";

type RouteType = {
  postid: string;
  commentid: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid, commentid, page } = await params;
    const rowsPerPage = 7;

    const { count, result } = await getReplies(
      postid,
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

export type ReplyResponseType = {
  replies: ReplyType;
  totalPages: number;
  totalRows: number;
};
