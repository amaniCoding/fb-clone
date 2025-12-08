"use client";
import { useEffect, useMemo, useRef } from "react";
import Post from "../post/post";
import CommentModal from "../commentmodal/comment-modal";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import ReactionModal from "../reactionmodal/reactionmodal";
import useSWRInfinite from "swr/infinite";
import { FeedsType } from "@/app/api/feeder/[page]/lib";
import FeedItemSkeleton from "@/app/components/skeletons/feed";
import { setFeeds } from "@/app/store/slices/feed/feed";
interface FeedsPage {
  feeds: FeedsType[];
  hasMore: boolean;
}
export default function Feeder() {
  const dispatch = useAppDispatch();
  const isCommentModalOpen = useAppSelector(
    (state) => state.commentModal.isOpen
  );

  const isReactionModalOpen = useAppSelector(
    (state) => state.reactionModal.isOpen
  );
  const feedsState = useAppSelector((state) => state.feed.feeds.feeds);

  const fetcher = async (url: string): Promise<FeedsPage> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return res.json();
  };

  const getKey = (pageIndex: number, previousPageData: FeedsPage | null) => {
    if (previousPageData && !previousPageData.hasMore) return null;

    return `/api/feeder/${pageIndex + 1}/`;
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<FeedsPage>(getKey, fetcher);

  const feeds: FeedsType[] = useMemo(() => {
    return data ? data.flatMap((page) => page.feeds) : [];
  }, [data]);

  const observerRef = useRef<HTMLDivElement>(null);

  const isLoadingMore =
    isLoading ||
    (isValidating && data && typeof data[size - 1] === "undefined");
  // const isReachingEnd = data && data[data.length - 1]?.feeds.length < PAGE_SIZE;
  const isReachingEnd = data && data[data.length - 1]?.hasMore === false;

  useEffect(() => {
    dispatch(
      setFeeds({
        feeds: feeds,
      })
    );
  }, [dispatch, feeds]);

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
  }, [size, setSize, isReachingEnd, isLoadingMore, error]);

  if (error) return <div>Failed to load items.</div>;
  if (!data && isLoading) return <FeedItemSkeleton />;
  return (
    <>
      {feedsState!.map((post, index) => (
        <Post key={index} post={post} />
      ))}

      <div ref={observerRef}>
        {isLoadingMore ? (
          <FeedItemSkeleton />
        ) : isReachingEnd ? (
          <p>You have reached the end of the list.</p>
        ) : null}
      </div>

      {isCommentModalOpen && <CommentModal />}
      {isReactionModalOpen && <ReactionModal />}
    </>
  );
}
