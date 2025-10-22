"use client";
import Header from "./header";
import Content from "./content";
import { PostsUser } from "../types";
import Medias from "./Medias";
import Upper from "./footer/upper/upper";
import Lower from "./footer/lower/lower";
export default function Post({ post }: { post: PostsUser }) {
  return (
    <>
      <div className="rounded-xl bg-white mb-4">
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
        />
        <Lower />
      </div>
    </>
  );
}
