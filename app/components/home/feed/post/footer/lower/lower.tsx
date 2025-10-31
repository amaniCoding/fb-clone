"use client";
import Image from "next/image";
import { useAppDispatch } from "@/app/store/hooks";
import { useRef, useState } from "react";
import ReactionBox from "../../reactionbox";
import { showCommentModal } from "@/app/store/slices/post/post";
import { setPost } from "@/app/store/slices/commentmodal/post";
import { PostsUser } from "../../../types";
import { FeedsType } from "@/app/apis/feeder/[page]/libs/feed";
import { openCommentModal } from "@/app/store/slices/feed/feed";

export default function Lower({
  post,
  refFrom,
}: {
  post: FeedsType | undefined;
  refFrom: string;
}) {
  const dispatch = useAppDispatch();
  const [toShowReactionBox, setToShowReactionBox] = useState<boolean>(false);
  const timeOutId = useRef<NodeJS.Timeout>(null);

  const _showCommentModal = () => {
    dispatch(
      openCommentModal({
        isOpen: true,
        post,
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
        <ReactionBox keepShowing={keepShowing} hideShowing={hideShowing} />
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
