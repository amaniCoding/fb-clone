"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Post from "../post/post";
import CommentModal from "../commentmodal.tsx/comment-modal";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FeedItemSkeleton from "@/app/components/skeletons/feed";
import {
  feedResponseType,
  setFeeds,
  setLoading,
  setNetWorkError,
  updatePage,
  updateTotalPagesAndRows,
} from "@/app/store/slices/feed/feed";
import Link from "next/link";
import axios from "axios";

export default function Feeder() {
  const isCommentModalOpen = useAppSelector(
    (state) => state.feed.commentModal.isOpen
  );
  const postForCommentModal = useAppSelector(
    (state) => state.feed.commentModal.post
  );
  const dispatch = useAppDispatch();
  const networkNotification = useAppSelector(
    (state) => state.feed.network.showNumber
  );
  const feeds = useAppSelector((state) => state.feed.feeds.feeds);

  const loading = useAppSelector((state) => state.feed.feeds.loading);
  const page = useAppSelector((state) => state.feed.feeds.page);
  const totalPages = useAppSelector((state) => state.feed.feeds.totalPages);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isOnLine, setIsOnLine] = useState<boolean>(navigator.onLine);
  const observer = useRef<IntersectionObserver>(null);

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

  const dispatchAccordly = (page: number, result: feedResponseType) => {
    if (page === 1) {
      dispatch(
        setFeeds({
          firstTime: true,
          result: result,
        })
      );
    } else {
      dispatch(
        setFeeds({
          firstTime: false,
          result: result,
        })
      );
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const getFeeds = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`/apis/feeder/${page}`, {
          signal: controller.signal,
        });
        dispatchAccordly(page, response.data.result as feedResponseType);
        dispatch(setLoading(false));
      } catch (error) {
        setHasError(true);
        dispatch(setLoading(false));
      }
    };

    if (isOnLine) {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "Your internet connection was restored",
          showNumber: networkNotification + 1,
        })
      );

      getFeeds();
    } else {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "You are currently offline",
          showNumber: networkNotification + 1,
        })
      );
    }
    window.addEventListener("online", () => {
      setIsOnLine(true);
    });
    window.addEventListener("offline", () => {
      setIsOnLine(false);
    });

    return () => {
      window.removeEventListener("online", () => {
        setIsOnLine(true);
      });
      window.removeEventListener("offline", () => {
        setIsOnLine(false);
      });
      controller.abort();
    };
  }, [dispatch, isOnLine, page]);

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
      {isCommentModalOpen && <CommentModal post={postForCommentModal} />}
    </>
  );
}
