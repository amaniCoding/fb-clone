import { CommentsType } from "@/app/api/comments/[refId]/lib";
import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
interface CommentsPage {
  comments: CommentsType;
}
export const useFetchComments = () => {
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

  return {
    loading: isLoadingMore,
    observerRef,
    size,
    isReachingEnd,
    comments,
    error,
    currentPost,
  };
};
