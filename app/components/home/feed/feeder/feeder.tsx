"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Post from "../post/post";
import CommentModal from "../commentmodal/comment-modal";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FeedItemSkeleton from "@/app/components/skeletons/feed";

import Link from "next/link";
import axios from "axios";
import {
  updatePage,
  setFeeds,
  setLoading,
  FeedResponseType,
} from "@/app/store/slices/feed/feed";
import ReactionModal from "../reactionmodal/reactionmodal";

export default function Feeder() {
  const isCommentModalOpen = useAppSelector(
    (state) => state.commentModal.isOpen
  );

  const isReactionModalOpen = useAppSelector(
    (state) => state.reactionModal.isOpen
  );

  const dispatch = useAppDispatch();

  const feeds = useAppSelector((state) => state.feed.feeds.feeds);

  const loading = useAppSelector((state) => state.feed.feeds.loading);
  const page = useAppSelector((state) => state.feed.feeds.page);
  const totalPages = useAppSelector((state) => state.feed.feeds.totalPages);
  const [hasError, setHasError] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver>(null);
  const { isOnline } = useAppSelector((state) => state.app.network);

  const hasMore = page <= totalPages;

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page + 1;
          dispatch(updatePage(newPage));
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page]
  );

  useEffect(() => {
    const controller = new AbortController();
    const getFeeds = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`/apis/feeder/${page}`, {
          signal: controller.signal,
        });
        dispatch(setFeeds(response.data.result as FeedResponseType));
        dispatch(setLoading(false));
      } catch (error) {
        setHasError(true);
        dispatch(setLoading(false));
      }
    };

    if (isOnline) {
      getFeeds();
    }
    return () => {
      controller.abort();
    };
  }, [dispatch, isOnline, page]);

  return (
    <>
      {feeds?.map((post, index) => (
        <Post
          key={index}
          post={post}
          ref={feeds?.length === index + 1 ? lastPostElementRef : null}
        />
      ))}
      {loading && <FeedItemSkeleton />}
      {hasError && (
        <div className="h-44 flex items-center justify-center">
          <div className="flex flex-col space-y-1">
            <p className="text-2xl">Something went worng</p>
            <Link
              className="block bg-blue-600 px-3 py-2 rounded-md text-center text-white"
              href={`/`}
            >
              Reload the page
            </Link>
          </div>
        </div>
      )}
      {isCommentModalOpen && <CommentModal />}
      {isReactionModalOpen && <ReactionModal />}
    </>
  );
}
