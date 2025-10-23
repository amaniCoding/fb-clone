"use client";
import Header from "./header";
import Content from "./content";
import { PostsUser } from "../types";
import Medias from "./Medias";
import Upper from "./footer/upper/upper";
import Lower from "./footer/lower/lower";
export default function Post({
  post,
  ref,
}: {
  post: PostsUser;
  ref: ((node: HTMLDivElement) => void) | null;
}) {
  return (
    <>
      <div className="rounded-xl bg-white mb-4" ref={ref}>
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
          reactions={post.reactions_grouped}
          firstReactions={post.reactions}
        />
        <Lower post={post} refFrom="post" />
      </div>
    </>
  );
}
