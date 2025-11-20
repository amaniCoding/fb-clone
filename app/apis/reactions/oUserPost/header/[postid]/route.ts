import { NextRequest } from "next/server";
import { getReactions } from "./lib";

type RouteType = {
  postid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid } = await params;
    const rowsPerPage = 7;

    const { result } = await getReactions(postid);

    const jsonResponse = {
      gReactions: result,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
