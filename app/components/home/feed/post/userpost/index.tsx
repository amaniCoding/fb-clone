import { UserPostType } from "@/app/apis/feeder/[page]/lib";
import User from "./user/user";

type UserPostProps = {
  post: UserPostType;
  feedId: string;
};
export default function UserPost({ post, feedId }: UserPostProps) {
  return (
    <>
      {post?.postType === "original" && (
        <User post={post.oUserPost} feedId={feedId} />
      )}
    </>
  );
}
