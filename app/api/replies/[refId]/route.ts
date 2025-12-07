import { NextRequest } from "next/server";
import { auth } from "@/app/auth";
import { getReplies } from "./lib";
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
      throw new Error("Un aauthorized request");
    }
    // const { refFrom, postType, postId, mediaId, commentId, page } = await params;
    const { refId } = await params;
    const split = refId.split("-");

    const refFrom = split[0];
    const postType = split[1];
    const postId = split[2];
    const mediaId = split[3];
    const commentId = split[4];
    const page = split[5];

    const { replies } = await getReplies(
      session.user.id,
      refFrom as "post" | "media",
      postType as PostType,
      postId,
      mediaId,
      commentId,
      parseInt(page)
    );

    const jsonResponse = {
      comments: replies,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
