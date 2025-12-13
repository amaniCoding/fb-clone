"use client";
import { CommentType } from "@/app/api/comments/[refId]/lib";
import { ReactionType } from "@/app/generated/prisma/client";
import CommentItem from "./commentItem";
import { useState } from "react";
import { useFetchReplies } from "../replies/hooks/useFetchReplies";
import Replies from "../replies/replies";

export default function Comment({
  comment,
  gReaction,
}: {
  comment: CommentType;
  gReaction: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const { loading, error, isReachingEnd, replies, setSize, size } =
    useFetchReplies(comment.id, shouldFetch);

  const viewAllReplies = () => {
    setShouldFetch(true);
    setSize(size + 1);
  };
  return replies.length === 0 ? (
    <div className="relative h-40 border-l-2 border-l-gray-300 border-b-2 border-b-gray-300">
      <CommentItem
        comment={comment}
        gReaction={gReaction}
        repliesCount={comment._count.replies}
      />
      <div className="w-[93%] bg-white absolute left-7 -bottom-1/2 translate-y-1/2">
        <button
          disabled={loading || isReachingEnd || !shouldFetch}
          className=" text-gray-500"
          onClick={viewAllReplies}
        >
          {loading
            ? "Loading..."
            : isReachingEnd
            ? "No more items"
            : comment._count.replies && comment._count.replies > 0
            ? `View all ${comment._count.replies} replies`
            : "View all replies"}
        </button>
      </div>
    </div>
  ) : (
    <div className="relative h-40 border-l-2 border-l-gray-300 border-b-2 border-b-gray-300">
      <Replies
        replies={replies}
        commentId={comment.id}
        repliesCount={comment._count.replies}
      />
      {error && (
        <p className="font-semibold text-center my-1">Failed to load replies</p>
      )}
    </div>
  );
}
