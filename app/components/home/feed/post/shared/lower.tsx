"use client";
import Image from "next/image";

import { useAppDispatch } from "@/app/store/hooks";
import { useRef, useState } from "react";

import { showCommentModal } from "@/app/store/slices/modal/comment";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/api/feeder/[page]/lib";
import ReactionBox from "../reactionbox/post/reactionbox";
import { PostType } from "@/app/generated/prisma/client";

type TypeProps = {
  post: {
    type: PostType;
    post: unknown;
  };
  refFrom: "modal" | "post";
};
export default function Lower({ refFrom, post }: TypeProps) {
  const dispatch = useAppDispatch();
  const [toShowReactionBox, setToShowReactionBox] = useState<boolean>(false);
  const timeOutId = useRef<NodeJS.Timeout>(null);

  const _showCommentModal = () => {
    if (post.type === "oUserPost") {
      const _post = post.post as OUserPost;
      dispatch(
        showCommentModal({
          isOpen: true,
          currentPost: {
            postType: "oUserPost",
            oUserPost: _post,
          },
        })
      );
    }
    if (post.type === "userSharePost") {
      const _post = post.post as UserSharePost;
      dispatch(
        showCommentModal({
          isOpen: true,
          currentPost: {
            postType: "userSharePost",
            userSharePost: _post,
          },
        })
      );
    }

    if (post.type === "oPagePost") {
      const _post = post.post as OPagePost;
      dispatch(
        showCommentModal({
          isOpen: true,
          currentPost: {
            postType: "oPagePost",
            oPagePost: _post,
          },
        })
      );
    }

    if (post.type === "pageSharePost") {
      const _post = post.post as PageSharePost;
      dispatch(
        showCommentModal({
          isOpen: true,
          currentPost: {
            postType: "pageSharePost",
            pageSharePost: _post,
          },
        })
      );
    }

    if (post.type === "oGroupPost") {
      const _post = post.post as OGroupPost;
      dispatch(
        showCommentModal({
          isOpen: true,
          currentPost: {
            postType: "oGroupPost",
            oGroupPost: _post,
          },
        })
      );
    }

    if (post.type === "toGroupSharedPost") {
      const _post = post.post as ToGroupSharedPost;
      dispatch(
        showCommentModal({
          isOpen: true,
          currentPost: {
            postType: "toGroupSharedPost",
            toGroupSharedPost: _post,
          },
        })
      );
    }
  };
  const showReactionBox = () => {
    setTimeout(() => {
      setToShowReactionBox(true);
    }, 500);
  };

  const hideReactionBox = () => {
    const timeOutIdValue = setTimeout(() => {
      setToShowReactionBox(false);
    }, 1000);
    timeOutId.current = timeOutIdValue;
  };

  const keepShowing = () => {
    clearTimeout(timeOutId.current!);
  };
  const hideShowing = () => {
    setTimeout(() => {
      setToShowReactionBox(false);
    }, 500);
  };
  return (
    <div className="flex items-center justify-between relative mx-1.5">
      {toShowReactionBox && (
        <ReactionBox
          post={post}
          keepShowing={keepShowing}
          hideShowing={hideShowing}
        />
      )}
      <div
        className="flex items-center justify-center rounded-md grow cursor-pointer hover:bg-gray-100"
        onMouseEnter={showReactionBox}
        onMouseLeave={hideReactionBox}
      >
        <div className="flex items-center px-3 py-1.5 space-x-1 ">
          <Image
            alt=""
            src={"/post/like.png"}
            width={0}
            height={0}
            sizes="100vh"
            className=" w-5 h-5 rounded-full block flex-none"
          />
          <p>Like</p>
        </div>
      </div>
      <div
        className="flex items-center justify-center rounded-md grow cursor-pointer hover:bg-gray-100"
        onClick={refFrom === "post" ? _showCommentModal : () => {}}
      >
        <div className="flex items-center px-3 py-1.5 space-x-1 ">
          <Image
            alt=""
            src={"/post/comment.png"}
            width={0}
            height={0}
            sizes="100vh"
            className=" w-5 h-5 rounded-full block flex-none"
          />
          <p>Comment</p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-md grow cursor-pointer hover:bg-gray-100">
        <div className="flex items-center px-3 py-1.5 space-x-1 ">
          <Image
            alt=""
            src={"/post/share.png"}
            width={0}
            height={0}
            sizes="100vh"
            className=" w-5 h-5 rounded-full block flex-none"
          />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}
