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

export default function CommentModal() {
  const { data, status } = useSession();
  const currentPost = useAppSelector(
    (state) => state.commentModal.currentPost?.post
  );
  const dispatch = useAppDispatch();
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
      return <OUser_Post refFrom="modal" post={currentPost as OUserPost} />;
    }

    if (currentPost?.postType === "userSharePost") {
      return (
        <UserShare_Post refFrom="modal" post={currentPost as UserSharePost} />
      );
    }

    if (currentPost?.postType === "oPagePost") {
      return <OPage_Post refFrom="modal" post={currentPost as OPagePost} />;
    }

    if (currentPost?.postType === "pageSharePost") {
      return (
        <PageShare_Post refFrom="modal" post={currentPost as PageSharePost} />
      );
    }

    if (currentPost?.postType === "oGroupPost") {
      return <OGroup_Post refFrom="modal" post={currentPost as OGroupPost} />;
    }

    if (currentPost?.postType === "toGroupSharedPost") {
      return (
        <ToGroupShare_Post
          refFrom="modal"
          post={currentPost as ToGroupSharedPost}
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
            <Comments />

            <AddComment loggedInUser={data?.user} />
          </div>
        </>
      </div>
    </div>
  );
}
