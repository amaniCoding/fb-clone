import { GroupPostType } from "@/app/apis/feeder/[page]/lib";
import Share from "./share/post";
import Original from "./original/post";

type UserPostProps = {
  post: GroupPostType;
  feedId: string;
};
export default function GroupPost({ post, feedId }: UserPostProps) {
  return (
    <>
      {post?.postType === "original" && (
        <Original post={post.oGroupPost} feedId={feedId} />
      )}

      {post?.postType === "share" && (
        <Share post={post.toGroupSharedPost} feedId={feedId} />
      )}
    </>
  );
}
