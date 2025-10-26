import { NextRequest } from "next/server";
import { getComments } from "./lib";
import { PostType } from "@/app/generated/prisma";
interface RouteParams {
  postid: string;
  page: string;
  posttype: PostType;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { page, postid, posttype } = await params;
    const result = await getComments(posttype, postid, parseInt(page));
    console.log("FUDK");
    return Response.json({ result: result });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to comment" }, { status: 500 });
  }
}
