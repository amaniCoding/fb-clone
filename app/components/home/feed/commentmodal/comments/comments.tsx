"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import { useFetchComments } from "@/app/hooks/commentsModal/usefetchcomments";
import { useCommentsLastNodeRef } from "@/app/hooks/commentsModal/uselastnoderef";
import { useAppSelector } from "@/app/store/hooks";
import Comment from "./comment";

export default function Comments({
  isFetchingPost,
}: {
  isFetchingPost: boolean | undefined;
}) {
  const currentParentRefId = useAppSelector(
    (state) => state.commentModal.currentParentRefId
  );

  const {
    loading,
    comments,
    error: { error, hasError },
    page,
    totalPages,
  } = useFetchComments();
  const hasMore = page! <= totalPages!;
  const lastCommentElementRef = useCommentsLastNodeRef(
    hasMore,
    loading!,
    page!
  );

  return (
    <>
      <p className="my-2"> pageTemp {page}</p>
      {comments!.map((comment, index) => {
        const gReactions = comment._gReactions
          ? [...comment._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        const ref =
          comments!.length === index + 1 ? lastCommentElementRef : null;
        return (
          <Comment
            key={index}
            comment={comment}
            currentParentRefId={currentParentRefId}
            gReactions={newGReactions}
            ref={ref}
          />
        );
      })}
      {loading! && !isFetchingPost! && <CommentsSkeleton />}
      {hasError && <p>{error}</p>}
    </>
  );
}
