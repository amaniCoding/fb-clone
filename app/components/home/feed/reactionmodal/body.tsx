"use client";

import Body from "@/app/components/skeletons/reactionsModal/body";
import Reactors from "./reactors";
import { useEffect, useRef } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { ReactorsType } from "@/app/api/reactions/body/[refId]/libs/post/lib";
import { useAppSelector } from "@/app/store/hooks";

interface ReactorsPage {
  reactors: ReactorsType;
}

export default function ModalBody() {
  const currentReactionType = useAppSelector(
    (state) => state.reactionModal.currentReactionType
  );
  const currentPostType = useAppSelector(
    (state) => state.reactionModal.currentPost.postType
  );

  const currentPost = useAppSelector(
    (state) => state.reactionModal.currentPost
  );

  const getPostId = () => {
    if (currentPostType === "oUserPost") {
      return currentPost.userPost?.postId;
    }
    if (currentPostType === "userSharePost") {
      return currentPost.userSharePost?.postId;
    }
    if (currentPostType === "oPagePost") {
      return currentPost.pagePost?.postId;
    }
    if (currentPostType === "pageSharePost") {
      return currentPost.pageSharePost?.postId;
    }
    if (currentPostType === "oGroupPost") {
      return currentPost.groupPost?.postId;
    }
    if (currentPostType === "toGroupSharedPost") {
      return currentPost.groupSharePost?.postId;
    }
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const PAGE_SIZE = 10;

  const getKey: SWRInfiniteKeyLoader<ReactorsPage, string | null> = (
    pageIndex: number,
    previousPageData: ReactorsPage | null
  ) => {
    if (previousPageData && previousPageData.reactors!.length === 0)
      return null;

    return `/api/reactions/post-itSelf-${currentPostType}-${getPostId()!}-dash-dash-dash-${currentReactionType}/${
      pageIndex + 1
    }`;
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<ReactorsPage>(getKey, fetcher);

  const reactors: ReactorsType = data
    ? data.flatMap((page) => page.reactors!)
    : [];

  const observerRef = useRef<HTMLDivElement>(null);

  const isLoadingMore =
    isLoading ||
    (isValidating && data && typeof data[size - 1] === "undefined");
  const isReachingEnd =
    data && data[data.length - 1]?.reactors!.length < PAGE_SIZE;

  useEffect(() => {
    if (isReachingEnd || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingMore) {
          setSize(size + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [size, setSize, isReachingEnd, isLoadingMore]);

  if (error) return <div>Failed to load posts</div>;
  if (isLoading) return <Body />;

  return (
    <div className="sticky top-0 left-0 right-0 py-2">
      <Reactors reactors={reactors} ref={observerRef} />
      {error && <p></p>}
    </div>
  );
}
