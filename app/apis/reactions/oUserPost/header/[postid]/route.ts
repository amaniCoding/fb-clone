import { NextRequest } from "next/server";
import { getReactions } from "./lib";
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
