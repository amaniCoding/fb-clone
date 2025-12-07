import { NextRequest } from "next/server";
import { getFeeds } from "./lib";
import { auth } from "@/app/auth";

type RouteType = {
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Un authorized", { status: 401 });
    }
    const { page } = await params;

    const { updated } = await getFeeds(session.user.id, parseInt(page));

    return Response.json({
      feeds: updated,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
