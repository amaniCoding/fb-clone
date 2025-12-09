"use client";
import UserHeader from "../header";
import Content from "../../shared/content";
import Medias from "../../shared/Medias";
import Upper from "../../shared/upper";
import Lower from "../../shared/lower";
import { OUserPost } from "@/app/api/feeder/[page]/lib";

type PropsTypes = {
  post: OUserPost;
  refFrom: "modal" | "post";
};

export default function OUser_Post({ refFrom, post }: PropsTypes) {
  return (
    <div
      className={`${
        refFrom === "post" ? "mb-4 rounded-xl  pb-1.5" : ""
      } bg-white `}
    >
      <UserHeader
        firstName={post?.user?.firstName}
        lastName={post?.user?.lastName}
        date={post?.createdAt?.toString()}
        profilePicture={post.user?.Profile?.profilePicture}
        refFrom="original"
        _refFrom={refFrom}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
      <Upper
        commentsCount={post?._count?.comments}
        reactionsCount={post?._count?.reactions}
        groupedReactions={post?._gReactions}
        firstReactions={post?.reactions}
        post={post}
        postId={post.postId}
        feedId={post.feedId}
      />
      <Lower post={post} refFrom={refFrom} />
    </div>
  );
}
