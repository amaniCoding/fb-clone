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
import Comments from "./comments/comments";

export default function CommentModal() {
  const { data, status } = useSession();
  const currentPost = useAppSelector((state) => state.commentModal.currentPost);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(
      showCommentModal({
        isOpen: false,
        currentPost: {},
      })
    );
  };

  const renderAppropriatePost = () => {
    if (currentPost.postType === "oUserPost") {
      return <OUser_Post refFrom="modal" post={currentPost.userPost!} />;
    }

    if (currentPost.postType === "userSharePost") {
      return (
        <UserShare_Post refFrom="modal" post={currentPost.userSharePost!} />
      );
    }

    if (currentPost.postType === "oPagePost") {
      return <OPage_Post refFrom="modal" post={currentPost.pagePost!} />;
    }

    if (currentPost.postType === "pageSharePost") {
      return (
        <PageShare_Post refFrom="modal" post={currentPost.pageSharePost!} />
      );
    }

    if (currentPost.postType === "oGroupPost") {
      return <OGroup_Post refFrom="modal" post={currentPost.groupPost!} />;
    }

    if (currentPost.postType === "toGroupSharedPost") {
      return (
        <ToGroupShare_Post refFrom="modal" post={currentPost.groupSharePost!} />
      );
    }
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-300 overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl my-10 relative ">
        <>
          <div className="sticky top-0 left-0 right-0 py-3 px-2">
            <Header
              postType={currentPost.postType}
              currentPost={currentPost}
              onClose={closeModal}
            />
          </div>
          <div className="max-h-120 overflow-y-auto">
            {renderAppropriatePost()}
            <Comments />
            <p className="my-2"></p>
            <AddComment loggedInUser={data?.user} />
          </div>
        </>
      </div>
    </div>
  );
}
