"use client";
import { useEffect, useState } from "react";
import Post from "../post/post";

import { PostsUser } from "../types";
import CommentModal from "../commentmodal.tsx/comment-modal";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FeedItemSkeleton from "@/app/components/skeletons/feed";
import {
  setFeeds,
  setLoading,
  setNetWorkError,
} from "@/app/store/slices/feed/feed";

export default function Feeder() {
  const isCommentModalShown = useAppSelector(
    (state) => state.post.toShowCommentModal
  );
  const dispatch = useAppDispatch();
  const posts_user = useAppSelector((state) => state.feed.feeds);
  const loading = useAppSelector((state) => state.feed.feeds.loading);

  const [isOnLine, setIsOnLine] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const getFeeds = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch("/feeder");
        const data = await response.json();
        dispatch(setFeeds(data.posts_user));
        dispatch(setLoading(false));
      } catch {
        dispatch(setLoading(false));
      }
    };
    if (isOnLine) {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "Your internet connection was restored",
        })
      );
      getFeeds();
    } else {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "You are currently offline",
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
    };
  }, [dispatch, isOnLine]);

  return (
    <>
      {posts_user.feeds!.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && <FeedItemSkeleton />}

      {isCommentModalShown && <CommentModal />}
    </>
  );
}
