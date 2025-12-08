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
import Link from "next/link";
interface FeedsPage {
  feeds: FeedsType[];
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
    if (previousPageData && previousPageData.feeds.length === 0) return null;

    return `/api/feeder/${pageIndex + 1}/`;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<FeedsPage>(getKey, fetcher);

  const feeds: FeedsType[] = useMemo(() => {
    return data ? data.flatMap((page) => page.feeds) : [];
  }, [data]);

  const observerRef = useRef<HTMLDivElement>(null);

  const isReachingEnd = data && data[data.length - 1]?.feeds.length < 10;
  // const isReachingEnd = data && data[data.length - 1]?.hasReachedEnd;
  console.log(isReachingEnd);
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

  if (error)
    return (
      <div className="w-full h-4 flex items-center justify-center text-red-500 font-bold">
        <div className="flex flex-col space-y-1">
          <p> Failed to load items.</p>
          <Link
            className="block px-2 py-2.5 rounded-xl bg-blue-600 text-white"
            href={`/`}
          >
            Reload this page
          </Link>
        </div>
      </div>
    );
  return (
    <>
      {feedsState!.map((post, index) => (
        <Post key={index} post={post} />
      ))}

      <div ref={observerRef}>
        {isLoading ? (
          <FeedItemSkeleton />
        ) : isReachingEnd ? (
          <div className="h-4 flex items-center justify-center">
            <p className="font-semibold">
              You have reached the end of the list.
            </p>
          </div>
        ) : null}
      </div>

      {isCommentModalOpen && <CommentModal />}
      {isReactionModalOpen && <ReactionModal />}
    </>
  );
}
