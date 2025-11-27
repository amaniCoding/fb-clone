import { NextRequest } from "next/server";
import { getMediaInfo, PostMediasType, PostMediaType } from "./lib";

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
    const rowsPerPage = 7;

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

export type PostMediaResponseType = {
  result: {
    media: PostMediaType;
    medias: PostMediasType;
  };
};
