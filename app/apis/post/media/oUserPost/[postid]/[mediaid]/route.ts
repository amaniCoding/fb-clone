import { NextRequest } from "next/server";
import { getMediaInfo, PostMediasType, PostMediaType } from "./lib";
import { auth } from "@/app/libs/auth/auth";

type RouteType = {
  postid: string;
  mediaid: string;
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
