"use client";
import Reply from "./reply";
import { useAppSelector } from "@/app/store/hooks";
import useSWRInfinite from "swr/infinite";
import { RepliesType } from "@/app/api/replies/[refId]/lib";
import { useState } from "react";
interface ReplyData {
  replies: RepliesType;
}
export default function Replies({
  commentId,
  repliesCount,
}: {
  commentId: string;
  replyId?: string;
  repliesCount?: number;
}) {
  const currentPost = useAppSelector(
    (state) => state.commentModal.currentPost?.post
  );
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const fetcher = async (url: string): Promise<ReplyData> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return res.json();
  };
  const PAGE_SIZE = 10;

  const getKey = (pageIndex: number, previousPageData: ReplyData | null) => {
    if (previousPageData && previousPageData.replies.length === 0) return null;
    const refId = `/api/replies/post_${currentPost?.postType}_${
      currentPost?.postId
    }_dash_${commentId}_${pageIndex + 1}/`;
    const key = shouldFetch ? refId : null;

    return key;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<ReplyData>(getKey, fetcher);

  const replies: RepliesType = data ? data.flatMap((page) => page.replies) : [];

  // const isLoadingMore =
  //   isLoading ||
  //   (isValidating && data && typeof data[size - 1] === "undefined");
  const isReachingEnd =
    data && data[data.length - 1]?.replies.length < PAGE_SIZE;

  const viewAllReplies = () => {
    setShouldFetch(true);
    setSize(size + 1);
  };
  return (
    <div className="w-full">
      <button
        disabled={isLoading || isReachingEnd || shouldFetch}
        className=" text-gray-500 "
        onClick={viewAllReplies}
      >
        {isLoading
          ? "Loading..."
          : isReachingEnd
          ? "No more items"
          : repliesCount && repliesCount > 0
          ? `View all ${repliesCount} replies`
          : "View all replies"}
      </button>
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
      {error && (
        <p className="font-semibold text-center my-1">Failed to load replies</p>
      )}
    </div>
  );
}
