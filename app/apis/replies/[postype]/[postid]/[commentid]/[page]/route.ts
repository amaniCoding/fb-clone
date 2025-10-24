import { NextRequest } from "next/server";
import { PostType } from "@/app/generated/prisma";
import { getReplies } from "./lib";
interface RouteParams {
  postid: string;
  commentid: string;
  page: number;
  posttype: PostType;
}

export async function GET(
  request: NextRequest,
  { params: { postid, page, commentid, posttype } }: { params: RouteParams }
) {
  try {
    const result = await getReplies(posttype, postid, commentid, page);

    return Response.json({ result: result });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
