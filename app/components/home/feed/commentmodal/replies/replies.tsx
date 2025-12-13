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
  return replies!.map((reply, index) => {
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
  });
}
