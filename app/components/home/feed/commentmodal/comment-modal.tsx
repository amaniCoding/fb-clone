"use client";
import Comments from "./comments";
import AddComment from "./addcomment";

import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/app/store/hooks";
import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import { showCommentModal } from "@/app/store/slices/modal/comment";
import { useFetchComments } from "@/app/hooks/commentsModal/comments";
import OUser_Post from "../post/userpost/original/post";
import UserShare_Post from "../post/userpost/share/post";
import OPage_Post from "../post/pagepost/original/post";
import PageShare_Post from "../post/pagepost/share/post";
import ToGroupShare_Post from "../post/grouppost/share/post";
import OGroup_Post from "../post/grouppost/original/post";
import Lower from "./Lower";

export default function CommentModal({
  post,
}: {
  post: FeedsType | undefined;
}) {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  const commentsModalData = useFetchComments();
  const closeCommentModal = () => {
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
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl bg-white my-10 ">
        {commentsModalData.currentPostData.postType === "oUserPost" && (
          <OUser_Post post={commentsModalData.currentPostData.oUserPost!} />
        )}

        {commentsModalData.currentPostData.postType === "userSharePost" && (
          <UserShare_Post
            post={commentsModalData.currentPostData.userSharePost!}
          />
        )}
        {commentsModalData.currentPostData.postType === "oPagePost" && (
          <OPage_Post post={commentsModalData.currentPostData.oPagePost!} />
        )}

        {commentsModalData.currentPostData.postType === "pageSharePost" && (
          <PageShare_Post
            post={commentsModalData.currentPostData.pageSharePost!}
          />
        )}

        {commentsModalData.currentPostData.postType === "oGroupPost" && (
          <OGroup_Post post={commentsModalData.currentPostData.oGroupPost!} />
        )}
        {commentsModalData.currentPostData.postType === "toGroupSharedPost" && (
          <ToGroupShare_Post
            post={commentsModalData.currentPostData.toGroupSharedPost!}
          />
        )}
        <div className=" p-1 border-b border-t-gray-300 border-t border-b-gray-300">
          <Lower />
        </div>
        <Comments />
      </div>
      <p className="my-2"></p>
      <AddComment loggedInUser={data?.user} />
    </div>
  );
}
