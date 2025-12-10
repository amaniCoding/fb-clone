import { NextRequest } from "next/server";
import { getComments } from "./lib";
import { auth } from "@/app/auth";
import { PostType } from "@/app/generated/prisma/client";

type RouteType = {
  refId: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un authorized request");
    }
    // const { refFrom, postType, postId, mediaId, page } = await params;

    const { refId } = await params;
    const split = refId.split("_");

    const refFrom = split[0];
    const postType = split[1];
    const postId = split[2];
    const mediaId = split[3];
    const page = split[4];

    const { comments } = await getComments(
      session.user.id,
      refFrom as "post" | "media",
      postType as PostType,
      postId,
      mediaId,
      parseInt(page)
    );
    console.log("refFrom", refFrom);
    console.log("posttype", postType);
    console.log("postid", postId);
    console.log("mediaid", mediaId);
    console.log("page", page);

    return Response.json({
      comments: comments,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
