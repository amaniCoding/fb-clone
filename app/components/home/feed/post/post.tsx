"use client";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { PostsUser } from "../types";
export default function Post({ post }: { post: PostsUser }) {
  return (
    <>
      <div className="rounded-xl bg-white mb-4">
        <Header
          firstName={post.user.firstName}
          lastName={post.user.lastName}
          date={post.createdAt.toLocaleString()}
        />

        <Content content={post.content} medias={post.medias} />
        <Footer />
      </div>
    </>
  );
}
