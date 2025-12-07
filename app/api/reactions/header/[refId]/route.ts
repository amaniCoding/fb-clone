import { NextRequest } from "next/server";
import { auth } from "@/app/auth";
import {
  getGreactionsForMedia,
  getGreactionsForMediaComment,
  getGreactionsForMediaReply,
  getGreactionsForMediaReplyReply,
} from "./media/lib";
import { PostType } from "@/app/generated/prisma/client";

type RouteType = {
  refId: string;
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
    // const { refFrom, postType, postId, mediaId, commentId, replyId, page } =
    //   await params;
    const { refId } = await params;

    const split = refId.split("-");

    const refFrom = split[0] as "post" | "media";
    const type = split[1] as "itSelf" | "comment" | "reply" | "replyReply";
    const postType = split[2] as PostType;
    const postId = split[3];
    const mediaId = split[4];
    const commentId = split[5];
    const replyId = split[6];
    const replyReplyId = split[7];
    let gReactions;

    if (refFrom === "post") {
      if (type === "itSelf") {
        gReactions = await getGreactionsForMedia(postType, postId);
        return;
      }

      if (type === "comment") {
        gReactions = await getGreactionsForMediaComment(commentId);
        return;
      }

      if (type === "reply") {
        gReactions = await getGreactionsForMediaReply(replyId);
        return;
      }

      if (type === "replyReply") {
        gReactions = await getGreactionsForMediaReplyReply(replyReplyId);
        return;
      }
      return;
    }

    if (refFrom === "media") {
      if (type === "itSelf") {
        gReactions = await getGreactionsForMedia(postType, mediaId);
        return;
      }

      if (type === "comment") {
        gReactions = await getGreactionsForMediaComment(commentId);
        return;
      }

      if (type === "reply") {
        gReactions = await getGreactionsForMediaReply(replyId);
        return;
      }

      if (type === "replyReply") {
        gReactions = await getGreactionsForMediaReplyReply(replyReplyId);
        return;
      }
      return;
    }

    const jsonResponse = {
      comments: gReactions,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
