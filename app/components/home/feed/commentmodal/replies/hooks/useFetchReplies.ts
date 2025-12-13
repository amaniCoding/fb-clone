import { RepliesType } from "@/app/api/replies/[refId]/lib";
import { useAppSelector } from "@/app/store/hooks";
import useSWRInfinite from "swr/infinite";

export const useFetchReplies = (commentId: string, shouldFetch: boolean) => {
  interface ReplyData {
    replies: RepliesType;
  }
  const currentPost = useAppSelector(
    (state) => state.commentModal.currentPost?.post
  );

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
  const isEmpty = data && data[data.length - 1]?.replies.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.replies.length < PAGE_SIZE);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  return {
    replies,
    loading: isLoadingMore,
    isReachingEnd,
    size,
    setSize,
    error,
    currentPost,
  };
};
