"use client";
import { reactOUserPost } from "@/app/actions/react/post/oUserPost/react";
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

export default function ReactionBox({
  keepShowing,
  hideShowing,
  post,
  refFrom,
}: {
  keepShowing: () => void;
  hideShowing: () => void;
  post: {
    type: PostType;
    post: unknown;
  };
  refFrom: "modal" | "post";
}) {
  const _reactAPost = async (reactionType: ReactionType) => {
    if (post.type === "oUserPost") {
      const _post = post.post as OUserPost;
      reactOUserPost(_post.id!, reactionType);
    }
    if (post.type === "userSharePost") {
      const _post = post.post as UserSharePost;
    }

    if (post.type === "oPagePost") {
      const _post = post.post as OPagePost;
    }

    if (post.type === "pageSharePost") {
      const _post = post.post as PageSharePost;
    }

    if (post.type === "oGroupPost") {
      const _post = post.post as OGroupPost;
    }

    if (post.type === "toGroupSharedPost") {
      const _post = post.post as ToGroupSharedPost;
    }
  };
  return (
    <div
      className="absolute left-0 bottom-12 z-[100] flex items-center p-1.5 bg-white shadow-lg space-x-1 rounded-4xl"
      onMouseEnter={keepShowing}
      onMouseLeave={hideShowing}
    >
      <Image
        onClick={() => _reactAPost("like")}
        alt=""
        src={"/reactions/like.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        onClick={() => _reactAPost("love")}
        alt=""
        src={"/reactions/love.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        onClick={() => _reactAPost("care")}
        alt=""
        src={"/reactions/care.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        onClick={() => _reactAPost("haha")}
        alt=""
        src={"/reactions/haha.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        onClick={() => _reactAPost("wow")}
        alt=""
        src={"/reactions/wow.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        onClick={() => _reactAPost("sad")}
        alt=""
        src={"/reactions/sad.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        onClick={() => _reactAPost("angry")}
        alt=""
        src={"/reactions/angry.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
    </div>
  );
}
