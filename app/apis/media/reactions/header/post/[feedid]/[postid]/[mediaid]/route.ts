import { NextRequest } from "next/server";
import { getReactions } from "./lib";

type RouteType = {
  feedid: string;
  postid: string;
  mediaid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { feedid, postid, mediaid } = await params;

    const { result } = await getReactions(feedid, postid, mediaid);

    const jsonResponse = {
      reactions: result,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
