"use client";
import Content from "../../shared/content";
import Medias from "../../shared/Medias";
import Upper from "../../shared/upper";
import PageHeader from "../header";

import { OPagePost } from "@/app/api/feeder/[page]/lib";

type PropsTypes = {
  post: OPagePost;
  refFrom: "modal" | "post";
};

export default function OPage_Post({ refFrom, post }: PropsTypes) {
  return (
    <div className={`${refFrom === "post" ? "pb-1.5" : ""}  `}>
      <PageHeader
        name={post.page?.name}
        profilePicture={post.page?.profilePicture}
        date={post?.createdAt?.toString()}
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
        feedId={post.feedId}
        postId={post.postId}
      />
    </div>
  );
}
