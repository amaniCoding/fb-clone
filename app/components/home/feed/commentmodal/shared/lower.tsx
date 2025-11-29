"use client";

import { useState, useRef } from "react";
import post from "../../post/post";
import ReactionBox from "../../post/reactionbox";

export default function Lower({
  fromWhat,
}: {
  fromWhat: "post" | "comment" | "reply" | "replyreply";
}) {
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
    <div className="flex items-center space-x-2 text-black/40 text-sm font-semibold">
      {toShowReactionBox && (
        <ReactionBox
          fromWhat={fromWhat}
          keepShowing={keepShowing}
          hideShowing={hideShowing}
        />
      )}
      <p>2hrs</p>
      <p>Like</p>
      {fromWhat === "reply" && <p>reply</p>}
    </div>
  );
}
