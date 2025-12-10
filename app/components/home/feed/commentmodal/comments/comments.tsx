"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import Comment from "./comment";
import useSWRInfinite from "swr/infinite";
import { useEffect, useRef } from "react";
import { CommentsType } from "@/app/api/comments/[refId]/lib";
import { useAppSelector } from "@/app/store/hooks";
import CommentFirstTimeSkeleton from "@/app/components/skeletons/commentFirst";
interface CommentsPage {
  comments: CommentsType;
}
export default function Comments() {
  const currentPost = useAppSelector(
    (state) => state.commentModal.currentPost?.post
  );

  const fetcher = async (url: string): Promise<CommentsPage> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return res.json();
  };
  const PAGE_SIZE = 10;

  const getKey = (pageIndex: number, previousPageData: CommentsPage | null) => {
    if (previousPageData && previousPageData.comments.length === 0) return null;

    return `/api/comments/post_${currentPost?.postType}_${
      currentPost?.postId
    }_dash_${pageIndex + 1}/`;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<CommentsPage>(getKey, fetcher);

  const comments: CommentsType = data
    ? data.flatMap((page) => page.comments)
    : [];

  const observerRef = useRef<HTMLDivElement>(null);
  console.log(isLoading);

  // const isLoadingMore =
  //   isLoading ||
  //   (isValidating && data && typeof data[size - 1] === "undefined");
  const isEmpty = data && data[data.length - 1]?.comments.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.comments.length < PAGE_SIZE);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          !isLoadingMore &&
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
  }, [error, isLoadingMore, isReachingEnd, setSize, size]);

  if (error)
    return (
      <div className="w-full bg-white h-20 flex items-center justify-center text-red-500 font-bold">
        <div className="flex flex-col space-y-1">
          <p> Failed to load comments.</p>
        </div>
      </div>
    );
  return (
    <div className="bg-white">
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
      {isLoadingMore && size === 1 && <CommentFirstTimeSkeleton />}
      {isLoadingMore && size > 1 && <CommentsSkeleton />}
      {isReachingEnd && <div>No more comments</div>}
    </div>
  );
}
