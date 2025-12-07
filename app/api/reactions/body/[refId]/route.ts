import { NextRequest } from "next/server";
import { auth } from "@/app/auth";
import { PostType, ReactionType } from "@/app/generated/prisma/client";
import {
  getReactorsForComment,
  getReactorsForPost,
  getReactorsForReply,
  getReactorsForReplyReply,
} from "./libs/post/lib";
import {
  getReactorsForMedia,
  getReactorsForMediaComment,
  getReactorsForMediaReply,
  getReactorsForMediaReplyReply,
} from "./libs/media/lib";

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
    const reactionType = split[8] as ReactionType;
    const page = split[9];
    let Reactors;

    if (refFrom === "post") {
      if (type === "itSelf") {
        Reactors = await getReactorsForPost(
          postType,
          postId,
          reactionType,
          parseInt(page)
        );
        return;
      }

      if (type === "comment") {
        Reactors = await getReactorsForComment(
          postType,
          postId,
          commentId,
          reactionType,
          parseInt(page)
        );
        return;
      }

      if (type === "reply") {
        Reactors = await getReactorsForReply(
          postType,
          postId,
          commentId,
          replyId,
          reactionType,
          parseInt(page)
        );
        return;
      }

      if (type === "replyReply") {
        Reactors = await getReactorsForReplyReply(
          postType,
          postId,
          commentId,
          replyId,
          replyReplyId,
          reactionType,
          parseInt(page)
        );
        return;
      }
      return;
    }

    if (refFrom === "media") {
      if (type === "itSelf") {
        Reactors = await getReactorsForMedia(
          postType,
          postId,
          mediaId,

          reactionType,
          parseInt(page)
        );
        return;
      }

      if (type === "comment") {
        Reactors = await getReactorsForMediaComment(
          postType,
          postId,
          mediaId,
          commentId,
          reactionType,
          parseInt(page)
        );
        return;
      }

      if (type === "reply") {
        Reactors = await getReactorsForMediaReply(
          postType,
          postId,
          mediaId,
          commentId,
          replyId,
          reactionType,
          parseInt(page)
        );
        return;
      }

      if (type === "replyReply") {
        Reactors = await getReactorsForMediaReplyReply(
          postType,
          postId,
          mediaId,
          commentId,
          replyId,
          replyReplyId,
          reactionType,
          parseInt(page)
        );
        return;
      }
      return;
    }

    const jsonResponse = {
      comments: Reactors,
    };

    return Response.json({
      result: jsonResponse,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
