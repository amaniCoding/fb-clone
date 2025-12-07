"use client";

import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/api/feeder/[page]/lib";
import { PostType } from "@/app/generated/prisma/client";
import { FaXmark } from "react-icons/fa6";

export default function Header({
  currentPost,
  postType,
  onClose,
}: {
  postType: PostType | undefined;
  currentPost: {
    postType?: PostType | undefined;
    userPost?: OUserPost;
    userSharePost?: UserSharePost;
    pagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    groupPost?: OGroupPost;
    groupSharePost?: ToGroupSharedPost;
  };
  onClose: () => void;
}) {
  const renderPoster = () => {
    if (postType === "oUserPost") {
      return (
        <p>
          {currentPost.userPost?.user?.firstName} {""}
          {currentPost.userPost?.user?.lastName}&apos;s Post
        </p>
      );
    }

    if (postType === "userSharePost") {
      return (
        <p>
          {currentPost.userSharePost?.user?.firstName} {""}
          {currentPost.userSharePost?.user?.lastName}&apos;s Post
        </p>
      );
    }

    if (postType === "oPagePost") {
      return <p>{currentPost.pagePost?.page?.name}&apos;s Post</p>;
    }

    if (postType === "pageSharePost") {
      return <p>{currentPost.pageSharePost?.page?.name}&apos;s Post</p>;
    }

    if (postType === "oGroupPost") {
      return <p>{currentPost.groupPost?.group?.name}&apos;s Post</p>;
    }

    if (postType === "toGroupSharedPost") {
      return (
        <p>
          {currentPost.groupSharePost?.user?.firstName} {""}{" "}
          {currentPost.groupSharePost?.group?.name}&apos;s Post
        </p>
      );
    }
  };
  return (
    <div className="shadow-sm flex rounded-t-xl items-center justify-between mb-2 border-b-2 border-b-slate-200 p-2 sticky w-full left-0 right-0 bg-white top-0">
      <p></p>
      {renderPoster()}
      <FaXmark
        className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}
