import { NextRequest } from "next/server";
import { getComments } from "./lib";
import { PostType } from "@/app/generated/prisma";
import { string } from "zod";
interface RouteParams {
  postid: string;
  page: string;
  posttype: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { page, postid, posttype } = await params;
    const result = await getComments(
      posttype as PostType,
      postid,
      parseInt(page)
    );
    console.log("FUDK");
    return Response.json({ result: result });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to comment" }, { status: 500 });
  }
}
