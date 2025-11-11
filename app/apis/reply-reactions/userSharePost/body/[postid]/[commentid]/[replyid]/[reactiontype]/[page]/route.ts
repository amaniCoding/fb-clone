import { NextRequest } from "next/server";
import { getReactors } from "./lib";
import { ReactionType } from "@/app/generated/prisma";

type RouteType = {
  postid: string;
  commentid: string;
  replyid: string;
  reactiontype: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid, commentid, replyid, reactiontype, page } = await params;
    const rowsPerPage = 7;

    const { count, result } = await getReactors(
      postid,
      commentid,
      replyid,
      reactiontype as ReactionType,
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
