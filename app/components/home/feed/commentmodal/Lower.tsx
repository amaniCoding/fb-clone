"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactionBox from "../post/reactionbox/comment/reactionbox";

export default function Lower() {
  const [toShowReactionBox, setToShowReactionBox] = useState<boolean>(false);
  const timeOutId = useRef<NodeJS.Timeout>(null);

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
      <div className="flex items-center justify-center rounded-md grow cursor-pointer hover:bg-gray-100">
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
