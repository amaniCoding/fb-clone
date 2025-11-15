import { UserPostType } from "@/app/apis/feeder/[page]/lib";
import User from "./original/post";
import Share from "./share";
import Original from "./original/post";

type UserPostProps = {
  post: UserPostType;
  feedId: string;
};
export default function UserPost({ post, feedId }: UserPostProps) {
  return (
    <>
      {post?.postType === "original" && (
        <Original post={post.oUserPost} feedId={feedId} />
      )}

      {post?.postType === "share" && (
        <Share post={post.userSharePost} feedId={feedId} />
      )}
    </>
  );
}
