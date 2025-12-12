"use client";
import AddComment from "./addcomment";

import { useSession } from "next-auth/react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { showCommentModal } from "@/app/store/slices/modal/comment";
import OUser_Post from "../post/userpost/original/post";
import UserShare_Post from "../post/userpost/share/post";
import OPage_Post from "../post/pagepost/original/post";
import PageShare_Post from "../post/pagepost/share/post";
import ToGroupShare_Post from "../post/grouppost/share/post";
import OGroup_Post from "../post/grouppost/original/post";
import Header from "./header";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  UserSharePost,
  ToGroupSharedPost,
} from "@/app/api/feeder/[page]/lib";
import Comments from "./comments/comments";
import { CommentsType } from "@/app/api/comments/[refId]/lib";
import useSWRInfinite from "swr/infinite";
import { useEffect, useRef } from "react";
import CommentFirstTimeSkeleton from "@/app/components/skeletons/commentFirst";
import CommentsSkeleton from "@/app/components/skeletons/comment";
interface CommentsPage {
  comments: CommentsType;
}
export default function CommentModal() {
  const { data: user, status } = useSession();
  const dispatch = useAppDispatch();
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

  if (error)
    return (
      <div className="w-full bg-white h-20 flex items-center justify-center font-semibold text-gray-500">
        <p className="text-center"> Failed to load comments.</p>
      </div>
    );

  const closeModal = () => {
    dispatch(
      showCommentModal({
        isOpen: false,
        action: "close",
      })
    );
  };

  const renderAppropriatePost = () => {
    if (currentPost?.postType === "oUserPost") {
      return (
        <OUser_Post
          refFrom="modal"
          post={currentPost as OUserPost}
          isCommentsLoading={isLoadingMore}
        />
      );
    }

    if (currentPost?.postType === "userSharePost") {
      return (
        <UserShare_Post
          refFrom="modal"
          post={currentPost as UserSharePost}
          isCommentsLoading={isLoadingMore}
        />
      );
    }

    if (currentPost?.postType === "oPagePost") {
      return (
        <OPage_Post
          refFrom="modal"
          post={currentPost as OPagePost}
          isCommentsLoading={isLoadingMore}
        />
      );
    }

    if (currentPost?.postType === "pageSharePost") {
      return (
        <PageShare_Post
          refFrom="modal"
          post={currentPost as PageSharePost}
          isCommentsLoading={isLoadingMore}
        />
      );
    }

    if (currentPost?.postType === "oGroupPost") {
      return (
        <OGroup_Post
          refFrom="modal"
          post={currentPost as OGroupPost}
          isCommentsLoading={isLoadingMore}
        />
      );
    }

    if (currentPost?.postType === "toGroupSharedPost") {
      return (
        <ToGroupShare_Post
          refFrom="modal"
          post={currentPost as ToGroupSharedPost}
          isCommentsLoading={isLoadingMore}
        />
      );
    }
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-300 overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl my-10 ">
        <>
          <div className="sticky top-0 left-0 right-0  ">
            <Header
              postType={currentPost?.postType}
              currentPost={currentPost}
              onClose={closeModal}
            />
          </div>
          <div className="max-h-120 overflow-y-auto bg-white">
            {renderAppropriatePost()}
            <Comments comments={comments} />
            <div ref={observerRef} className="h-5"></div>{" "}
            {isLoadingMore && size === 1 && <CommentFirstTimeSkeleton />}
            {isLoadingMore && size > 1 && <CommentsSkeleton />}
            {isReachingEnd && <div>No more comments</div>}
            <AddComment loggedInUser={user?.user} />
          </div>
        </>
      </div>
    </div>
  );
}
