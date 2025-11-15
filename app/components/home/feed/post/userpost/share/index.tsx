"use client";
import { UserSharePostType } from "@/app/apis/feeder/[page]/lib";

import OUserPost from "./user/post";
import Lower from "./lower";
import Header from "./header";
import OPagePost from "./page/post";
import OGroupPost from "./group/post";

type UserSharePostProps = {
  post: UserSharePostType;
  feedId: string;
};

export default function Share({ post, feedId }: UserSharePostProps) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        firstName={post?.user?.firstName}
        lastName={post?.user?.lastName}
        date={post?.createdAt?.toISOString()}
      />
      {post.shareWhat === "user" && <OUserPost post={post.rawOUserPost} />}
      {post.shareWhat === "page" && <OPagePost post={post.rawOPagePost} />}
      {post.shareWhat === "group" && <OGroupPost post={post.rawOGroupPost} />}
      <Lower post={post} feedId={feedId} refFrom="post" />
    </div>
  );
}
