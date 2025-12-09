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

type TypeProps = {
  post:
    | OUserPost
    | UserSharePost
    | OPagePost
    | PageSharePost
    | OGroupPost
    | ToGroupSharedPost;
  refFrom: "modal" | "post";
};
export default function Lower({ refFrom, post }: TypeProps) {
  const dispatch = useAppDispatch();
  const [toShowReactionBox, setToShowReactionBox] = useState<boolean>(false);
  const timeOutId = useRef<NodeJS.Timeout>(null);

  const _showCommentModal = () => {
    dispatch(
      showCommentModal({
        isOpen: true,
        currentPost: {
          postType: "oUserPost",
          post: post,
        },
        action: "open",
      })
    );
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
      {post._isReacted?.isReacted && (
        <div
          className="flex items-center justify-center rounded-md grow cursor-pointer hover:bg-gray-100"
          onMouseEnter={showReactionBox}
          onMouseLeave={hideReactionBox}
        >
          {post._isReacted.reactionType === "like" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/like.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-blue-500">Like</p>
            </div>
          )}

          {post._isReacted.reactionType === "love" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/love.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-pink-400">Love</p>
            </div>
          )}

          {post._isReacted.reactionType === "wow" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/wow.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-amber-300">Wow</p>
            </div>
          )}

          {post._isReacted.reactionType === "care" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/care.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-amber-300">Care</p>
            </div>
          )}

          {post._isReacted.reactionType === "haha" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/haha.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-amber-300">Haha</p>
            </div>
          )}

          {post._isReacted.reactionType === "sad" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/sad.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-amber-300">Sad</p>
            </div>
          )}

          {post._isReacted.reactionType === "angry" && (
            <div className="flex items-center px-3 py-1.5 space-x-1 ">
              <Image
                alt=""
                src={"/reactions/angry.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 rounded-full block flex-none"
              />
              <p className="text-pink-400">Angry</p>
            </div>
          )}
        </div>
      )}
      {!post._isReacted?.isReacted && (
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
      )}
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
