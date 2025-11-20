"use client";
import Header from "../header";
import Content from "../shared/content";
import Medias from "../shared/Medias";
import Upper from "../shared/upper";
import Lower from "./lower";
import { OUserPost } from "@/app/apis/feeder/[page]/lib";

type PropsTypes = {
  post: OUserPost;
};

export default function OUser_Post({ post }: PropsTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        firstName={post?.user?.firstName}
        lastName={post?.user?.lastName}
        date={post?.createdAt?.toISOString()}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
      <Upper
        commentsCount={post?._count?.comments}
        reactionsCount={post?._count?.reactions}
        groupedReactions={post?._gReactions}
        firstReactions={post?.reactions}
        postId={post.postId}
        feedId={post.feedId}
      />
      <Lower post={post} />
    </div>
  );
}
