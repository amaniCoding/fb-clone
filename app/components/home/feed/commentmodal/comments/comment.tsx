"use client";
import { CommentType } from "@/app/api/comments/[refId]/lib";
import { ReactionType } from "@/app/generated/prisma/client";
import CommentItem from "./commentItem";
import Replies from "../replies/replies";
import { useAppSelector } from "@/app/store/hooks";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { RepliesType } from "@/app/api/replies/[refId]/lib";
import Reply from "../replies/reply";
interface ReplyData {
  replies: RepliesType;
}
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
    }_dash_${comment.id}_${pageIndex + 1}/`;
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
  return replies.length === 0 ? (
    <div
      className={` mb-10 h-auto relative w-full ${
        comment._count.replies > 0
          ? "border-l-2 border-b-2 border-b-gray-300    border-l-gray-300 rounded-bl-xl"
          : " border-l-2 border-b-2 border-b-gray-300    border-l-gray-300 rounded-bl-xl "
      } `}
    >
      <CommentItem
        comment={comment}
        gReaction={gReaction}
        repliesCount={comment!._count.replies}
      />
      <div className="w-[95%] bg-white absolute left-7 -bottom-3.5 z-10">
        <button
          disabled={isLoading || isReachingEnd || shouldFetch}
          className=" text-gray-500 bg-white "
          onClick={viewAllReplies}
        >
          {isLoading
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
    <div
      className={` mb-10 h-auto w-full ${
        comment._count.replies > 0
          ? "border-l-2 border-b-2 border-b-gray-300    border-l-gray-300 rounded-bl-xl"
          : " border-l-2 border-b-2 border-b-gray-300    border-l-gray-300 rounded-bl-xl "
      } `}
    >
      <div className="w-full">
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
              commentId={comment.id}
            />
          );
        })}
        {error && (
          <p className="font-semibold text-center my-1">
            Failed to load replies
          </p>
        )}
      </div>
    </div>
  );
}
