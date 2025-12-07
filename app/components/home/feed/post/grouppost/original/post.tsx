"use client";
import Content from "../../shared/content";
import Lower from "../../shared/lower";
import Medias from "../../shared/Medias";
import Upper from "../../shared/upper";
import GroupHeader from "../header";

import { OGroupPost } from "@/app/api/feeder/[page]/lib";

type PropsTypes = {
  post: OGroupPost;
  refFrom: "modal" | "post";
};

export default function OGroup_Post({ refFrom, post }: PropsTypes) {
  const _post = {
    type: post.postType!,
    post,
  };
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <GroupHeader
        group={post?.group}
        memeber={post?.user}
        date={post?.createdAt?.toString()}
        refFrom="original"
      />
      <Content content={post?.content} />
      <Medias medias={post?.medias} />
      <Upper
        commentsCount={post?._count?.comments}
        reactionsCount={post?._count?.reactions}
        groupedReactions={post?._gReactions}
        firstReactions={post?.reactions}
        post={_post}
        feedId={post.feedId}
        postId={post.postId}
      />
      <Lower post={_post} refFrom={refFrom} />
    </div>
  );
}
