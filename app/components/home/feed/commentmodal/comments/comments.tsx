"use client";
import Comment from "./comment";

import { CommentsType } from "@/app/api/comments/[refId]/lib";

export default function Comments({ comments }: { comments: CommentsType }) {
  return (
    <div className="bg-white pl-7 pt-6 relative">
      {comments!.map((comment, index) => {
        const gReactions = comment._gReactions
          ? [...comment._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReaction =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;

        return (
          <Comment key={index} comment={comment} gReaction={newGReaction} />
        );
      })}
    </div>
  );
}
