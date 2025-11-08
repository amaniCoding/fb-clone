"use client";
import { UserPostType } from "@/app/apis/feeder/[page]/lib";
import Lower from "./footer/lower/lower";
import Content from "../shared/content";
import Medias from "../shared/Medias";
import Upper from "../shared/upper/upper";
import Header from "./header";

type UserPostProps = {
  post: UserPostType;
  feedId: string;
};

export default function User({ post, feedId }: UserPostProps) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        firstName={post.user?.firstName}
        lastName={post.user?.lastName}
        date={post.createdAt?.toISOString()}
      />

      <Content content={post.content} />
      <Medias medias={post.medias} />
      <Upper
        commentsCount={post._count?.comments}
        reactionsCount={post._count?.reactions}
        groupedReactions={post._gReactions}
        firstReactions={post.reactions}
      />
      <Lower post={post} feedId={feedId} refFrom="post" />
    </div>
  );
}
