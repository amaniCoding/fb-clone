"use client";
import { reactOuserPost } from "@/app/actions/react/post/oUserPost/react";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/apis/feeder/[page]/lib";
import { PostType, ReactionType } from "@/app/generated/prisma";
import Image from "next/image";
import ReactAPost from "./reactionbox/reactapost";

export default function ReactionBox({
  keepShowing,
  hideShowing,
  post,
  refFrom,
  fromWhat,
}: {
  keepShowing: () => void;
  hideShowing: () => void;
  post?: {
    type: PostType;
    post: unknown;
  };
  refFrom?: "modal" | "post";
  fromWhat: "post" | "comment" | "reply" | "replyreply";
}) {
  const _reactAPost = () => {
    const x = reactOuserPost.bind(null, "someid", "haha" as ReactionType);
    return x;
    // if (fromWhat === "post") {
    //   if (post!.type === "oUserPost") {
    //     const _post = post!.post as OUserPost;
    //     const action = reactOuserPost;
    //     action.bind(null, "someid");
    //     action.bind(null, "haha" as ReactionType);
    //     return action;
    //   }
    //   if (post!.type === "userSharePost") {
    //     const _post = post!.post as UserSharePost;
    //   }

    //   if (post!.type === "oPagePost") {
    //     const _post = post!.post as OPagePost;
    //   }

    //   if (post!.type === "pageSharePost") {
    //     const _post = post!.post as PageSharePost;
    //   }

    //   if (post!.type === "oGroupPost") {
    //     const _post = post!.post as OGroupPost;
    //   }

    //   if (post!.type === "toGroupSharedPost") {
    //     const _post = post!.post as ToGroupSharedPost;
    //   }
    //   return;
    // }
  };
  return (
    <div
      className="absolute left-0 bottom-12 z-[100] flex items-center p-1.5 bg-white shadow-lg space-x-1 rounded-4xl"
      onMouseEnter={keepShowing}
      onMouseLeave={hideShowing}
    >
      <ReactAPost reactAction={_reactAPost} />
    </div>
  );
}
