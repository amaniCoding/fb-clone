import { NextRequest } from "next/server";
import { getReactors } from "./lib";
import { ReactionType } from "@/app/generated/prisma";

type RouteType = {
  feedid: string;
  posttype: string;
  commentid: string;
  replyid: string;
  replyreplyid: string;
  reactiontype: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const rowsPerPage = 7;

    const {
      feedid,
      posttype,
      commentid,
      replyid,
      replyreplyid,
      reactiontype,
      page,
    } = await params;

    const { count, result } = await getReactors(
      feedid,
      "original",
      commentid,
      replyid,
      replyreplyid,
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
