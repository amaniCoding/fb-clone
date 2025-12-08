"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import Comment from "./comment";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useEffect, useRef } from "react";
import { CommentsType } from "@/app/api/comments/[refId]/lib";
import { useAppSelector } from "@/app/store/hooks";
interface CommentsPage {
  comments: CommentsType;
}
export default function Comments() {
  const currentPost = useAppSelector(
    (state) => state.commentModal.currentPost?.post
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const PAGE_SIZE = 10;

  const getKey: SWRInfiniteKeyLoader<CommentsPage, string | null> = (
    pageIndex: number,
    previousPageData: CommentsPage | null
  ) => {
    if (previousPageData && previousPageData.comments.length === 0) return null;

    return `/api/comments/post-${currentPost?.postType}-${
      currentPost?.postId
    }/dash-dash-dash-dash/${pageIndex + 1}/`;
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<CommentsPage>(getKey, fetcher);

  const comments: CommentsType = data
    ? data.flatMap((page) => page.comments)
    : [];

  const observerRef = useRef<HTMLDivElement>(null);

  const isLoadingMore =
    isLoading ||
    (isValidating && data && typeof data[size - 1] === "undefined");
  const isReachingEnd =
    data && data[data.length - 1]?.comments.length < PAGE_SIZE;

  useEffect(() => {
    if (isReachingEnd || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingMore) {
          setSize(size + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [size, setSize, isReachingEnd, isLoadingMore]);

  if (error) return <div>Failed to load posts</div>;

  return (
    <>
      {comments!.map((comment, index) => {
        const gReactions = comment._gReactions
          ? [...comment._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;

        return (
          <Comment key={index} comment={comment} gReactions={newGReactions} />
        );
      })}
      <div ref={observerRef}>{isLoading && <CommentsSkeleton />}</div>
    </>
  );
}
