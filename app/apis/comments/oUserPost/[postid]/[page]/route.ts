import { NextRequest } from "next/server";
import { CommentType, getComments } from "./lib";

type RouteType = {
  postid: string;
  page: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteType> }
) {
  try {
    const { postid, page } = await params;
    const rowsPerPage = 7;

    const { count, result } = await getComments(
      postid,
      parseInt(page),
      rowsPerPage
    );

    const jsonResponse = {
      comments: result,
      totalRows: count ? count : 0,
      totalPages: Math.ceil(count ? count / rowsPerPage : 0),
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}

export type CommentsResponseType = {
  comments: CommentType;
  totalRows: number;
  totalPages: number;
};
