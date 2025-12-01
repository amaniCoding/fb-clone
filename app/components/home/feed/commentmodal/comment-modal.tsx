"use client";
import AddComment from "./addcomment";

import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/app/store/hooks";
import { showCommentModal } from "@/app/store/slices/modal/comment";
import OUser_Post from "../post/userpost/original/post";
import UserShare_Post from "../post/userpost/share/post";
import OPage_Post from "../post/pagepost/original/post";
import PageShare_Post from "../post/pagepost/share/post";
import ToGroupShare_Post from "../post/grouppost/share/post";
import OGroup_Post from "../post/grouppost/original/post";
import Header from "./header";
import { useFetchPost } from "@/app/hooks/commentsModal/usefetchpost";
import Comments from "./comments/comments";
import PostSkeleton from "@/app/components/skeletons/post";

export default function CommentModal() {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  const fetch = useFetchPost();
  const closeModal = () => {
    dispatch(
      showCommentModal({
        isOpen: false,
      })
    );
  };

  console.log("loading", fetch.loading);
  console.log("hasError", fetch.error.hasError);

  const renderAppropriatePost = () => {
    if (fetch.type === "oUserPost") {
      return (
        <OUser_Post refFrom="modal" post={fetch.currentPost?.oUserPost!} />
      );
    }

    if (fetch.type === "userSharePost") {
      return (
        <UserShare_Post
          refFrom="modal"
          post={fetch.currentPost?.userSharePost!}
        />
      );
    }

    if (fetch.type === "oPagePost") {
      return (
        <OPage_Post refFrom="modal" post={fetch.currentPost?.oPagePost!} />
      );
    }

    if (fetch.type === "pageSharePost") {
      return (
        <PageShare_Post
          refFrom="modal"
          post={fetch.currentPost?.pageSharePost!}
        />
      );
    }

    if (fetch.type === "oGroupPost") {
      return (
        <OGroup_Post refFrom="modal" post={fetch.currentPost?.oGroupPost!} />
      );
    }

    if (fetch.type === "toGroupSharedPost") {
      return (
        <ToGroupShare_Post
          refFrom="modal"
          post={fetch.currentPost?.toGroupSharedPost!}
        />
      );
    }
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      {fetch.loading! || fetch.error.hasError! ? (
        <div className="shadow-2xl  py-3 my-24 px-4 h-56 max-w-[650px] mx-auto rounded-xl relative bg-white ">
          <PostSkeleton />
        </div>
      ) : (
        <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl my-10 relative ">
          <>
            <div className="sticky top-0 left-0 right-0 py-3 px-2">
              <Header post={fetch} onClose={closeModal} />
            </div>
            <div className="max-h-[30rem] overflow-y-auto">
              {renderAppropriatePost()}
              <Comments isFetchingPost={fetch.loading} />
              <p className="my-2"></p>
              <AddComment loggedInUser={data?.user} />
            </div>
          </>
        </div>
      )}
    </div>
  );
}
