"use client";
import { OriginalUserPostType } from "@/app/apis/feeder/[page]/lib";
import Header from "./header";
import Content from "./content";
import Medias from "./Medias";
import Upper from "./upper";
import Lower from "./lower";

type PropsTypes = {
  post: OriginalUserPostType;

  feedId: string;
};

export default function Original({ post, feedId }: PropsTypes) {
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
      />
      <Lower post={post} feedId={feedId} refFrom="post" />
    </div>
  );
}
