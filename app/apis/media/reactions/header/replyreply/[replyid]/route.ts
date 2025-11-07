import { NextRequest } from "next/server";
import { getGReactions } from "./lib";

type RouteType = {
  replyid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const rowsPerPage = 7;

    const { replyid } = await params;

    const { count, result } = await getGReactions(replyid);

    const jsonResponse = {
      result,
      totalRows: count,
      totalPages: Math.ceil(count / rowsPerPage),
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
