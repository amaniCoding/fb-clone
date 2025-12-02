import { NextRequest } from "next/server";
import { getPost, OPagePostCommentModalType } from "./lib";
import { auth } from "@/app/libs/auth/auth";

type RouteType = {
  postid: string;
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

export type OPagePostCommentModalResponseType = {
  result: OPagePostCommentModalType;
};
