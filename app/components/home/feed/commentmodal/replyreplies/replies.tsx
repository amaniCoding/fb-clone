"use client";
import Reply from "./reply";
import { useAppSelector } from "@/app/store/hooks";
import useSWRInfinite from "swr/infinite";
import { RepliesType } from "@/app/api/replyreplies/[refId]/lib";
import { useState } from "react";
interface ReplyData {
  replies: RepliesType;
}
export default function Replies({
  commentId,
  replyId,
  repliesCount,
}: {
  repliesCount: number;
  replyId: string;
  commentId: string;
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
    const refId = `/api/replyreplies/post_${currentPost?.postType}_${
      currentPost?.postId
    }_dash_${commentId}_${replyId}_${pageIndex + 1}/`;
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
    <div id="replies">
      <button
        disabled={isLoading || isReachingEnd || shouldFetch}
        className="my-1.5 text-gray-500"
        onClick={viewAllReplies}
      >
        {isLoading
          ? "Loading..."
          : isReachingEnd
          ? "No more items"
          : `View all ${repliesCount} replies`}
      </button>
      {replies!.map((reply, index) => {
        const gReactions = reply._gReactions
          ? [...reply._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReaction =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        return <Reply key={index} reply={reply} gReaction={newGReaction} />;
      })}
      {error && <p>Faild to load replies</p>}
    </div>
  );
}
