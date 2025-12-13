import { GroupPostType } from "@/app/api/feeder/[page]/lib";
import OGroup_Post from "./original/post";
import ToGroupShare_Post from "./share/post";
import Lower from "../shared/lower";

type PropsTypes = {
  post: GroupPostType;
};
export default function GroupPost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && (
        <div className="flex flex-col rounded-xl bg-white mb-4">
          <OGroup_Post refFrom="post" post={post.oGroupPost} />
          <Lower post={post.oGroupPost} refFrom="post" />
        </div>
      )}

      {post?.postType === "share" && (
        <div className="flex flex-col rounded-xl bg-white mb-4">
          <ToGroupShare_Post refFrom="post" post={post.toGroupSharedPost} />
          <Lower post={post.toGroupSharedPost} refFrom="post" />
        </div>
      )}
    </>
  );
}
