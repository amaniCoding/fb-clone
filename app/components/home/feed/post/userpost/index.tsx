import { UserPostType } from "@/app/api/feeder/[page]/lib";
import OUser_Post from "./original/post";
import UserShare_Post from "./share/post";

type PropsTypes = {
  post: UserPostType;
};
export default function UserPost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && (
        <OUser_Post refFrom="post" post={post.oUserPost} />
      )}

      {post?.postType === "share" && (
        <UserShare_Post refFrom="post" post={post.userSharePost} />
      )}
    </>
  );
}
