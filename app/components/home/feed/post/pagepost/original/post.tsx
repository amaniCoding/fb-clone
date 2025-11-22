"use client";
import PageHeader from "../header";
import Content from "../shared/content";
import Medias from "../shared/Medias";
import Upper from "../shared/upper";
import Lower from "./lower";
import { OPagePost } from "@/app/apis/feeder/[page]/lib";

type PropsTypes = {
  post: OPagePost;
};

export default function OPage_Post({ post }: PropsTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <PageHeader
        name={post.page?.name}
        profilePicture={post.page?.profilePicture}
        date={post?.createdAt?.toString()}
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
