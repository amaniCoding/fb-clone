"use client";
import { useEffect, useState } from "react";
import Post from "../post/post";

import { PostsUser } from "../types";
import CommentModal from "../commentmodal.tsx/comment-modal";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FeedItemSkeleton from "@/app/components/skeletons/feed";
import { setNetWorkError } from "@/app/store/slices/feed";

export default function Posts() {
  const isCommentModalShown = useAppSelector(
    (state) => state.feed.currentPostAction.toShowCommentModal
  );
  const dispatch = useAppDispatch();
  const [posts_user, setPosts_user] = useState<PostsUser[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const [isOnLine, setIsOnLine] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const getFeeds = async () => {
      try {
        setLoading(true);
        const response = await fetch("/feeder");
        const data = await response.json();

        setPosts_user(data.posts_user);
        setLoading(false);
      } catch {
        setLoading(false);
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
      {loading && <FeedItemSkeleton />}
      {posts_user?.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isCommentModalShown && <CommentModal />}
    </>
  );
}
