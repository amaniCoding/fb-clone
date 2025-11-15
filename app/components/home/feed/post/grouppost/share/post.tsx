"use client";
import { ToGroupSharePostType } from "@/app/apis/feeder/[page]/lib";

import OUserPost from "./user/post";
import Lower from "./lower";
import OPagePost from "./page/post";
import OGroupPost from "./group/post";
import Page from "./header/page";
import User from "./header/user";

type PropsTypes = {
  post: ToGroupSharePostType;
  feedId: string;
};

export default function Share({ post, feedId }: PropsTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      {post.sharer === "page" && (
        <Page
          name={post?.page?.name}
          profilePicture={post.page?.profilePicture}
          date={post?.createdAt?.toISOString()}
        />
      )}

      {post.sharer === "user" && (
        <User
          firstName={post?.user?.firstName}
          lastName={post?.user?.lastName}
          date={post?.createdAt?.toISOString()}
        />
      )}
      {post.shareWhat === "user" && <OUserPost post={post.rawOUserPost} />}
      {post.shareWhat === "page" && <OPagePost post={post.rawOPagePost} />}
      {post.shareWhat === "group" && <OGroupPost post={post.rawOGroupPost} />}
      <Lower post={post} feedId={feedId} refFrom="post" />
    </div>
  );
}
