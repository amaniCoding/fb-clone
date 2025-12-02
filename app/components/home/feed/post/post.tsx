"use client";

import {
  FeedsType,
  GroupPostType,
  PagePostType,
  UserPostType,
} from "@/app/api/feeder/[page]/lib";
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
        <UserPost post={post.userPost as UserPostType} />
      )}

      {post && post.postType === "page" && (
        <PagePost post={post.pagePost as PagePostType} />
      )}

      {post && post.postType === "group" && (
        <GroupPost post={post.groupPost as GroupPostType} />
      )}
    </div>
  );
}
