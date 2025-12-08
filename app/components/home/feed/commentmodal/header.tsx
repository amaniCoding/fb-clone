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
  currentPost:
    | OUserPost
    | UserSharePost
    | OPagePost
    | PageSharePost
    | OGroupPost
    | ToGroupSharedPost
    | undefined;
  onClose: () => void;
}) {
  const renderPoster = () => {
    if (postType === "oUserPost") {
      const _post = currentPost as OUserPost;

      return (
        <p>
          {_post.user?.firstName} {""}
          {_post.user?.lastName}&apos;s Post
        </p>
      );
    }

    if (postType === "userSharePost") {
      const _post = currentPost as UserSharePost;
      return (
        <p>
          {_post?.user?.firstName} {""}
          {_post?.user?.lastName}&apos;s Post
        </p>
      );
    }

    if (postType === "oPagePost") {
      const _post = currentPost as OPagePost;
      return <p>{_post.page?.name}&apos;s Post</p>;
    }

    if (postType === "pageSharePost") {
      const _post = currentPost as PageSharePost;
      return <p>{_post.page?.name}&apos;s Post</p>;
    }

    if (postType === "oGroupPost") {
      const _post = currentPost as OGroupPost;
      return <p>{_post.group?.name}&apos;s Post</p>;
    }

    if (postType === "toGroupSharedPost") {
      const _post = currentPost as ToGroupSharedPost;
      return (
        <p>
          {_post.user?.firstName} {""} {_post.group?.name}&apos;s Post
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
