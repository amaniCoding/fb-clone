import { NextRequest } from "next/server";
import { getReactors } from "./lib";

type RouteType = {
  feedid: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const rowsPerPage = 7;

    const { feedid, page } = await params;

    const { result } = await getReactors(feedid, parseInt(page), rowsPerPage);

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
