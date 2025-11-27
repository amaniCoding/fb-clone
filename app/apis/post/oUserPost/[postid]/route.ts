import { NextRequest } from "next/server";
import { getPost, OUserPostCommentModalType } from "./lib";

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

export type OUserPostCommentModalResponseType = {
  result: OUserPostCommentModalType;
};
