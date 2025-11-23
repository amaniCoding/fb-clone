import { NextRequest } from "next/server";
import { getReactions } from "./lib";

type RouteType = {
  replyreplyid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { replyreplyid } = await params;

    const { result } = await getReactions(replyreplyid);

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
