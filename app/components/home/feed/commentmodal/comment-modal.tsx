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

export default function CommentModal() {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  const commentsModalData = useFetchComments();
  const closeModal = () => {
    dispatch(
      showCommentModal({
        isOpen: false,
      })
    );
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl bg-white my-10 relative ">
        <div className="sticky top-0 left-0 right-0 py-3 px-2">
          <div className="flex items-center justify-between">
            <p>Amanuel Ferede's post</p>
            <p> </p>
            <FaXmark
              className="w-10 h-10 p-2 hover:bg-gray-50 bg-gray-100 rounded-full cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
        <div className="max-h-[30rem] overflow-y-auto">
          {commentsModalData.currentPostData.postType === "oUserPost" && (
            <OUser_Post
              refFrom="modal"
              post={commentsModalData.currentPostData.oUserPost!}
            />
          )}

          {commentsModalData.currentPostData.postType === "userSharePost" && (
            <UserShare_Post
              refFrom="modal"
              post={commentsModalData.currentPostData.userSharePost!}
            />
          )}
          {commentsModalData.currentPostData.postType === "oPagePost" && (
            <OPage_Post
              refFrom="modal"
              post={commentsModalData.currentPostData.oPagePost!}
            />
          )}

          {commentsModalData.currentPostData.postType === "pageSharePost" && (
            <PageShare_Post
              refFrom="modal"
              post={commentsModalData.currentPostData.pageSharePost!}
            />
          )}

          {commentsModalData.currentPostData.postType === "oGroupPost" && (
            <OGroup_Post
              refFrom="modal"
              post={commentsModalData.currentPostData.oGroupPost!}
            />
          )}
          {commentsModalData.currentPostData.postType ===
            "toGroupSharedPost" && (
            <ToGroupShare_Post
              refFrom="modal"
              post={commentsModalData.currentPostData.toGroupSharedPost!}
            />
          )}

          <Comments />
          <p className="my-2"></p>
          <AddComment loggedInUser={data?.user} />
        </div>
      </div>
    </div>
  );
}
