import { GroupPostType } from "@/app/apis/feeder/[page]/lib";
import OGroup_Post from "./original/post";
import ToGroupShare_Post from "./share/post";

type PropsTypes = {
  post: GroupPostType;
};
export default function GroupPost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && <OGroup_Post post={post.oGroupPost} />}

      {post?.postType === "share" && (
        <ToGroupShare_Post post={post.toGroupSharedPost} />
      )}
    </>
  );
}
