import { NextRequest } from "next/server";
import { getReplies, ReplyReplysType } from "./lib";
import { auth } from "@/app/libs/auth/auth";

type RouteType = {
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
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un aauthorized request");
    }
    const { postid, commentid, replyid, page } = await params;
    const rowsPerPage = 7;

    const { count, result } = await getReplies(
      postid,
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

export type ReplyRepliesResponseType = {
  replies: ReplyReplysType;
  totalPages: number;
  totalRows: number;
};
