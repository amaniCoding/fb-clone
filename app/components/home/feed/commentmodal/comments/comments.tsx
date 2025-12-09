"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import Comment from "./comment";
import useSWRInfinite from "swr/infinite";
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

  const fetcher = (url: string): Promise<CommentsPage> =>
    fetch(url).then((res) => res.json());
  const PAGE_SIZE = 10;

  const getKey = (pageIndex: number, previousPageData: CommentsPage | null) => {
    if (previousPageData && previousPageData.comments.length === 0) return null;

    return `/api/comments/post-${currentPost?.postType}-${
      currentPost?.postId
    }-dash-${pageIndex + 1}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<CommentsPage>(getKey, fetcher);

  const comments: CommentsType = data
    ? data.flatMap((page) => page.comments)
    : [];

  const observerRef = useRef<HTMLDivElement>(null);

  // const isLoadingMore =
  //   isLoading ||
  //   (isValidating && data && typeof data[size - 1] === "undefined");
  const isReachingEnd =
    data && data[data.length - 1]?.comments.length < PAGE_SIZE;

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          !isLoading &&
          !error &&
          !isReachingEnd
        ) {
          setSize(size + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [error, isLoading, isReachingEnd, setSize, size]);

  if (error) return <div>Failed to load posts</div>;

  return (
    <div className="bg-white">
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
      <div ref={observerRef}>
        {isLoading ? (
          <CommentsSkeleton />
        ) : isReachingEnd ? (
          <div className="h-4 flex items-center justify-center">
            <p className="font-semibold">
              You have reached the end of the list.
            </p>
          </div>
        ) : null}
      </div>{" "}
    </div>
  );
}
