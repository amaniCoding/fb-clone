"use client";
import { ReplyRepliesType } from "@/app/api/replyreplies/[refId]/lib";
import Reply from "./reply";
import { RepliesType } from "@/app/api/replies/[refId]/lib";

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
  return (
    <div className="w-93% absolute left-7 -bottom-1/2 translate-y-1/2 bg-white">
      {replies!.map((reply, index) => {
        const gReactions = reply._gReactions
          ? [...reply._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        return (
          <Reply
            key={index}
            reply={reply}
            gReaction={newGReactions}
            commentId={commentId}
          />
        );
      })}
    </div>
  );
}
