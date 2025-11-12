"use client";
import {
  OriginalUserPostType,
  UserPostType,
} from "@/app/apis/feeder/[page]/lib";
import Header from "./header";
import Upper from "../../../commentmodal/upper";
import Content from "../../shared/content";
import Medias from "../../shared/Medias";
import Lower from "./footer/lower/lower";

type OUserPostProps = {
  post: OriginalUserPostType;
  feedId: string;
};

export default function User({ post, feedId }: OUserPostProps) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        firstName={post.firstName}
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
      />
      <Lower post={post} feedId={feedId} refFrom="post" />
    </div>
  );
}
