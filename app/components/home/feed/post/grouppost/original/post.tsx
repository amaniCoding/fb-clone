"use client";
import GroupHeader from "../header";
import Content from "../shared/content";
import Medias from "../shared/Medias";
import Upper from "../shared/upper";
import Lower from "./lower";
import { OGroupPost } from "@/app/apis/feeder/[page]/lib";

type PropsTypes = {
  post: OGroupPost;
};

export default function OGroup_Post({ post }: PropsTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <GroupHeader
        group={post?.group}
        memeber={post?.user}
        date={post?.createdAt?.toISOString()}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
      <Upper
        commentsCount={post?._count?.comments}
        reactionsCount={post?._count?.reactions}
        groupedReactions={post?._gReactions}
        firstReactions={post?.reactions}
      />
      <Lower post={post} />
    </div>
  );
}
