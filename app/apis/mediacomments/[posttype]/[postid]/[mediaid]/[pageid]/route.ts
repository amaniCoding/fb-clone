import { NextRequest } from "next/server";
import { getComments } from "./lib";
import { PostType } from "@/app/generated/prisma";
interface RouteParams {
  postid: string;
  mediaid: string;
  page: number;
  posttype: PostType;
}

export async function GET(
  request: NextRequest,
  { params: { mediaid, page, postid, posttype } }: { params: RouteParams }
) {
  try {
    const result = await getComments(posttype, postid, mediaid, page);

    return Response.json({ result: result });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
