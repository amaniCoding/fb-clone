import ReplyItem from "./replyItem";
import { ReactionType } from "@/app/generated/prisma/client";
import { ReplyType } from "@/app/api/replies/[refId]/lib";
import { useState } from "react";
import { useFetchReplies } from "./hooks/useFetchRepliesForReply";
import Replies from "./replies";

export default function Reply({
  reply,

  gReaction,
  commentId,
  replyId,
}: {
  reply: ReplyType;
  commentId: string;
  gReaction: {
    reactionType: ReactionType;
    count: number;
  }[];
  replyId?: string;
}) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const {
    error,
    isReachingEnd,
    loading,
    replies: replyReplies,
    setSize,
    size,
  } = useFetchReplies(commentId, replyId, shouldFetch);
  const viewAllReplies = () => {
    setShouldFetch(true);
    setSize(size + 1);
  };
  return replyReplies.length === 0 ? (
    <div className="">
      <ReplyItem gReaction={gReaction} reply={reply} />
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
            : reply._count.replies && reply._count.replies > 0
            ? `View all ${reply._count.replies} replies`
            : "View all replies"}
        </button>
      </div>
    </div>
  ) : (
    <div className="relative h-40 border-l-2 border-l-gray-300 border-b-2 border-b-gray-300">
      <Replies
        replyReplies={replyReplies}
        commentId={commentId}
        repliesCount={reply._count.replies ? reply._count.replies : undefined}
      />
      {error && (
        <p className="font-semibold text-center my-1">Failed to load replies</p>
      )}
    </div>
  );
}
