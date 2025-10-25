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
  params: Promise<{ params: RouteParams }>
) {
  try {
    const {
      params: { page, postid, posttype },
    } = await params;
    const result = await getComments(posttype, postid, page);
    console.log("FUDK");
    return Response.json({ result: result });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to comment" }, { status: 500 });
  }
}
