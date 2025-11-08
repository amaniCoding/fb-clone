"use client";

import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import User from "./user/user";
import Page from "./page/page";
export default function Post({
  post,
  ref,
}: {
  post: FeedsType;
  ref: ((node: HTMLDivElement) => void) | null;
}) {
  return (
    <div ref={ref}>
      {post.postType === "user" && (
        <User post={post.userPost} feedId={post.id} />
      )}

      {post.postType === "page" && (
        <Page post={post.userPost} feedId={post.id} />
      )}
    </div>
  );
}
