"use client";
import Comments from "./comments";
import AddComment from "./addcomment";

import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/app/store/hooks";
import { showCommentModal } from "@/app/store/slices/modal/comment";
import { useFetchComments } from "@/app/hooks/commentsModal/comments";
import OUser_Post from "../post/userpost/original/post";
import UserShare_Post from "../post/userpost/share/post";
import OPage_Post from "../post/pagepost/original/post";
import PageShare_Post from "../post/pagepost/share/post";
import ToGroupShare_Post from "../post/grouppost/share/post";
import OGroup_Post from "../post/grouppost/original/post";
import Lower from "./Lower";
import { FaXmark } from "react-icons/fa6";
import Header from "./header";
import CommentsSkeleton from "@/app/components/skeletons/comment";

export default function CommentModal() {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  const { post } = useFetchComments();
  const closeModal = () => {
    dispatch(
      showCommentModal({
        isOpen: false,
      })
    );
  };

  const renderAppropriatePost = () => {
    if (post.type === "oUserPost") {
      return <OUser_Post refFrom="modal" post={post.currentPost?.oUserPost!} />;
    }

    if (post.type === "userSharePost") {
      return (
        <UserShare_Post
          refFrom="modal"
          post={post.currentPost?.userSharePost!}
        />
      );
    }

    if (post.type === "oPagePost") {
      return <OPage_Post refFrom="modal" post={post.currentPost?.oPagePost!} />;
    }

    if (post.type === "pageSharePost") {
      return (
        <PageShare_Post
          refFrom="modal"
          post={post.currentPost?.pageSharePost!}
        />
      );
    }

    if (post.type === "oGroupPost") {
      return (
        <OGroup_Post refFrom="modal" post={post.currentPost?.oGroupPost!} />
      );
    }

    if (post.type === "toGroupSharedPost") {
      return (
        <ToGroupShare_Post
          refFrom="modal"
          post={post.currentPost?.toGroupSharedPost!}
        />
      );
    }
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl bg-white my-10 relative ">
        {post.loading || post.error.hasError ? (
          <CommentsSkeleton />
        ) : (
          <>
            <div className="sticky top-0 left-0 right-0 py-3 px-2">
              <Header post={post} onClose={closeModal} />
            </div>
            <div className="max-h-[30rem] overflow-y-auto">
              {renderAppropriatePost()}
              <Comments />
              <p className="my-2"></p>
              <AddComment loggedInUser={data?.user} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
