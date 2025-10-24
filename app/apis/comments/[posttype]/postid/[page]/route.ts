import { NextRequest } from "next/server";
import { getComments } from "./lib";
import { PostType } from "@/app/generated/prisma";
interface RouteParams {
  postid: string;
  page: number;
  posttype: PostType;
}

export async function GET(
  request: NextRequest,
  { params: { page, postid, posttype } }: { params: RouteParams }
) {
  try {
    const result = await getComments(posttype, postid, page);

    return Response.json({ result: result });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
