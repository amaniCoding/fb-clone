"use client";

import { useState, useRef } from "react";
import ReactionBox from "../../post/reactionbox/comment/reactionbox";

export default function Left({
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
    <div className="flex items-center justify-between space-x-2 text-black/40 text-sm font-semibold">
      {toShowReactionBox && (
        <ReactionBox keepShowing={keepShowing} hideShowing={hideShowing} />
      )}
      <p>2hrs</p>
      <p onMouseEnter={showReactionBox} onMouseLeave={hideReactionBox}>
        Like
      </p>
      {fromWhat === "reply" && <p>reply</p>}
      {fromWhat === "comment" && <p>reply</p>}
    </div>
  );
}
