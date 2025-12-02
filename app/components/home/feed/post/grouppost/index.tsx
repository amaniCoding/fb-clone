import { GroupPostType } from "@/app/api/feeder/[page]/lib";
import OGroup_Post from "./original/post";
import ToGroupShare_Post from "./share/post";

type PropsTypes = {
  post: GroupPostType;
};
export default function GroupPost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && (
        <OGroup_Post refFrom="post" post={post.oGroupPost} />
      )}

      {post?.postType === "share" && (
        <ToGroupShare_Post refFrom="post" post={post.toGroupSharedPost} />
      )}
    </>
  );
}
