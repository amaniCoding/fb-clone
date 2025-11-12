"use client";
import { PagePostType } from "@/app/apis/feeder/[page]/lib";
import Content from "../shared/content";
import Lower from "./footer/lower/lower";
import Upper from "../shared/upper/upper";
import Header from "./header";
import Medias from "../shared/Medias";

type PagePostProps = {
  post: PagePostType;
  feedId: string;
};

export default function Page({ post, feedId }: PagePostProps) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header pageName={post.page?.name} date={post.createdAt?.toISOString()} />

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
