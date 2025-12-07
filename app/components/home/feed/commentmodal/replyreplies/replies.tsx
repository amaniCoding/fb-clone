"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import Reply from "./reply";
import { RepliesType } from "@/app/api/replies/[refId]/lib";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useAppSelector } from "@/app/store/hooks";
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
  const currentPostType = useAppSelector(
    (state) => state.commentModal.currentPost.postType
  );
  const currentPost = useAppSelector((state) => state.commentModal.currentPost);
  const getPostId = () => {
    if (currentPostType === "oUserPost") {
      return currentPost.userPost?.postId;
    }
    if (currentPostType === "userSharePost") {
      return currentPost.userSharePost?.postId;
    }
    if (currentPostType === "oPagePost") {
      return currentPost.pagePost?.postId;
    }
    if (currentPostType === "pageSharePost") {
      return currentPost.pageSharePost?.postId;
    }
    if (currentPostType === "oGroupPost") {
      return currentPost.groupPost?.postId;
    }
    if (currentPostType === "toGroupSharedPost") {
      return currentPost.groupSharePost?.postId;
    }
  };
  const [page, setPage] = useState<number>(1);
  const fetcher = (url: string): Promise<ReplyData> =>
    fetch(url).then((res) => res.json());
  const PAGE_SIZE = 10;
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR<ReplyData>(null, fetcher);
  const replies = [...data!.replies, ...data!.replies];
  const isReachingEnd =
    data?.replies &&
    data.replies[data.replies.length - 1]?.replies.length < PAGE_SIZE;

  if (error) return <div>Failed to load replies</div>;

  const viewAllReplies = async (commentId: string, replyId: string) => {
    if (!isReachingEnd) {
      await mutate(
        `/api/replies/post-${currentPostType}-${getPostId()!}-dash-${commentId}-${replyId}-${
          page + 1
        }/`
      );
      setPage(page + 1);
    }
  };
  return (
    <div id="replies">
      <p
        className="my-1.5 text-gray-500"
        onClick={() => {
          viewAllReplies(commentId, replyId);
        }}
      >
        View all {repliesCount} replies
      </p>
      {replies!.map((reply, index) => {
        const gReactions = reply._gReactions
          ? [...reply._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        return <Reply key={index} reply={reply} gReactions={newGReactions} />;
      })}
      {isLoading && <CommentsSkeleton />}
    </div>
  );
}
