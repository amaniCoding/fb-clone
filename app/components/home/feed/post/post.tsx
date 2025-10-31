"use client";
import Header from "./header";
import Content from "./content";
import { PostsUser } from "../types";
import Medias from "./Medias";
import Upper from "./footer/upper/upper";
import Lower from "./footer/lower/lower";
import { FeedsType } from "@/app/apis/feeder/[page]/libs/feed";
export default function Post({
  post,
  ref,
}: {
  post: FeedsType;
  ref: ((node: HTMLDivElement) => void) | null;
}) {
  return (
    <>
      <div className="rounded-xl bg-white mb-4 pb-1.5" ref={ref}>
        <Header
          firstName={post.user.firstName}
          lastName={post.user.lastName}
          date={post.createdAt.toString()}
        />

        <Content content={post.content} />
        <Medias medias={post.medias} />
        <Upper
          commentsCount={post._count.comments}
          reactionsCount={post._count.reactions}
          groupedReactions={post._groupedReactions}
          firstReactions={post.reactions}
        />
        <Lower post={post} refFrom="post" />
      </div>
    </>
  );
}
