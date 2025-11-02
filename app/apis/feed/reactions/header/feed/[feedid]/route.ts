import { NextRequest } from "next/server";
import { getReactions } from "./lib";

type RouteType = {
  feedid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { feedid } = await params;

    const { result } = await getReactions(feedid);

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
