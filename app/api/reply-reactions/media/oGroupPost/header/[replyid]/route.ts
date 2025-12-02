import { NextRequest } from "next/server";
import { getReactions } from "./lib";

type RouteType = {
  replyid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { replyid } = await params;

    const { result } = await getReactions(replyid);

    const jsonResponse = {
      result,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
