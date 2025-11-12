"use client";

import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import UserPost from "./userpost";
import PagePost from "./pagepost";
import GroupPost from "./grouppost";
export default function Post({
  post,
  ref,
}: {
  post: FeedsType;
  ref: ((node: HTMLDivElement) => void) | null;
}) {
  return (
    <div ref={ref}>
      {post && post.postType === "user" && (
        <UserPost post={post.userPost} feedId={post.id} />
      )}

      {post && post.postType === "page" && (
        <PagePost post={post.pagePost} feedId={post.id} />
      )}

      {post && post.postType === "group" && (
        <GroupPost post={post.groupPost} feedId={post.id} />
      )}
    </div>
  );
}
