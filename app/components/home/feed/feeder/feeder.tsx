"use client";
import { useEffect, useState } from "react";
import Post from "../post/post";

import CommentModal from "../commentmodal.tsx/comment-modal";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FeedItemSkeleton from "@/app/components/skeletons/feed";
import {
  setFeeds,
  setLoading,
  setNetWorkError,
} from "@/app/store/slices/feed/feed";
import Link from "next/link";

export default function Feeder() {
  const isCommentModalShown = useAppSelector(
    (state) => state.post.toShowCommentModal
  );
  const dispatch = useAppDispatch();
  const networkNotification = useAppSelector(
    (state) => state.feed.network.showNumber
  );
  const posts_user = useAppSelector((state) => state.feed.feeds.feeds);
  const loading = useAppSelector((state) => state.feed.feeds.loading);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isOnLine, setIsOnLine] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const getFeeds = async () => {
      try {
        dispatch(setLoading(true));
        setHasError(false);
        const response = await fetch("/feeder");
        const data = await response.json();
        setHasError(false);
        dispatch(setFeeds(data.posts_user));
        dispatch(setLoading(false));
      } catch (error) {
        setHasError(true);

        dispatch(setLoading(false));
      }
    };

    if (isOnLine) {
      if (networkNotification === "once") {
        dispatch(
          setNetWorkError({
            isOnline: true,
            status: "Your internet connection was restored",
            showNumber: "more",
          })
        );
      }
      getFeeds();
    } else {
      if (networkNotification === "once") {
        dispatch(
          setNetWorkError({
            isOnline: true,
            status: "You are currently offline",
            showNumber: "more",
          })
        );
      }
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
    };
  }, [dispatch, isOnLine]);

  return (
    <>
      {posts_user!.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && <FeedItemSkeleton />}
      {(hasError || !isOnLine) && (
        <div className="h-44 flex items-center justify-center">
          <div className="flex flex-col space-y-1">
            <p className="text-2xl">Something went wrong</p>
            <Link
              className="block py-2 px-3 rounded-lg bg-blue-600 text-white text-center"
              href={`/`}
            >
              Reload the page
            </Link>
          </div>
        </div>
      )}

      {isCommentModalShown && <CommentModal />}
    </>
  );
}
