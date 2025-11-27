import { NextRequest } from "next/server";
import { getMediaInfo } from "./lib";

type RouteType = {
  postid: string;
  mediaid: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid, mediaid } = await params;

    const { updatedMedia, updatedMedias } = await getMediaInfo(postid, mediaid);

    const jsonResponse = {
      media: updatedMedia,
      medias: updatedMedias,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
