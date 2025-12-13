"use client";
import Comment from "./comment";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import CommentFirstTimeSkeleton from "@/app/components/skeletons/commentFirst";
import Lower from "../../post/shared/lower";
import { useFetchComments } from "../hooks/useFetchComment";

export default function Comments() {
  const {
    loading,
    comments,
    isReachingEnd,
    observerRef,
    size,
    error,
    currentPost,
  } = useFetchComments();
  if (error)
    return (
      <div className="w-full bg-white h-20 flex items-center justify-center font-semibold text-gray-500">
        <p className="text-center"> Failed to load comments.</p>
      </div>
    );
  return (
    <div>
      {loading && !loading && size === 1 && (
        <Lower refFrom="modal" post={currentPost!} />
      )}
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
        <div ref={observerRef} className="h-5"></div>{" "}
        {loading && size === 1 && <CommentFirstTimeSkeleton />}
        {loading && size > 1 && <CommentsSkeleton />}
        {isReachingEnd && <div>No more comments</div>}
      </div>
    </div>
  );
}
