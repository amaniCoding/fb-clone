import { NextRequest } from "next/server";
import { getPost, ToGroupSharePostCommentModalType } from "./lib";

type RouteType = {
  postid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid } = await params;

    const result = await getPost(postid);

    return Response.json({
      result: result,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}

export type ToGroupSharePostCommentModalResponseType = {
  result: ToGroupSharePostCommentModalType;
};
