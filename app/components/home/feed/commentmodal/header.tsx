"use client";

import { usePostsPostType } from "@/app/hooks/commentsModal/usefetchpost";
import { FaXmark } from "react-icons/fa6";

export default function Header({
  post,
  onClose,
}: {
  post: usePostsPostType;
  onClose: () => void;
}) {
  const renderPoster = () => {
    if (post.type === "oUserPost") {
      return (
        <p>
          {post.currentPost?.oUserPost?.user?.firstName} {""}
          {post.currentPost?.oUserPost?.user?.lastName}'s Post
        </p>
      );
    }

    if (post.type === "userSharePost") {
      return (
        <p>
          {post.currentPost?.userSharePost?.user?.firstName} {""}
          {post.currentPost?.userSharePost?.user?.lastName}'s Post
        </p>
      );
    }

    if (post.type === "oPagePost") {
      return <p>{post.currentPost?.oPagePost?.page?.name}'s Post</p>;
    }

    if (post.type === "pageSharePost") {
      return <p>{post.currentPost?.pageSharePost?.page?.name}'s Post</p>;
    }

    if (post.type === "oGroupPost") {
      return <p>{post.currentPost?.oGroupPost?.group?.name}'s Post</p>;
    }

    if (post.type === "toGroupSharedPost") {
      return (
        <p>
          {post.currentPost?.toGroupSharedPost?.user?.firstName} {""}{" "}
          {post.currentPost?.toGroupSharedPost?.group?.name}'s Post
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
