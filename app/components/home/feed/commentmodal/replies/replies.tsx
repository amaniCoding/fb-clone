"use client";
import { ReplyRepliesType } from "@/app/api/replyreplies/[refId]/lib";
import Reply from "./reply";
import { RepliesType } from "@/app/api/replies/[refId]/lib";
import { useEffect, useRef, useState } from "react";

export default function Replies({
  commentId,
  replies,
}: {
  replies?: RepliesType;
  replyReplies?: ReplyRepliesType;
  commentId: string;
  replyId?: string;
  repliesCount?: number;
}) {
  const [divHeights, setDivHeights] = useState<Record<number, number>>({});
  // Use a ref to store references to each div element
  const divRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const newHeights: Record<number, number> = {};
    // Measure heights after component mounts/updates
    replies!.forEach((item, index) => {
      const ref = divRefs.current[index];
      if (ref) {
        // Use offsetHeight or getBoundingClientRect().height to get the actual rendered height
        newHeights[index] = ref.offsetHeight;
      }
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDivHeights(newHeights);
  }, [replies]); // Re-run if data changes
  return (
    <div className="w-[95%] bg-white ">
      {replies!.map((reply, index) => {
        const gReactions = reply._gReactions
          ? [...reply._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        return (
          <Reply
            height={divHeights[index] ? `${divHeights[index]}px` : "auto"}
            ref={(el) => (divRefs.current[index] = el)}
            key={index}
            reply={reply}
            index={index}
            gReaction={newGReactions}
            commentId={commentId}
          />
        );
      })}
    </div>
  );
}
