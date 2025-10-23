import { NextRequest } from "next/server";
import { getComments } from "./lib";
interface RouteParams {
  postId: string;
  page: number;
}

export async function GET(
  request: NextRequest,
  { params: { page, postId } }: { params: RouteParams }
) {
  try {
    const { comments, count } = await getComments(postId, page);

    return Response.json({ comments: comments, count: count });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
