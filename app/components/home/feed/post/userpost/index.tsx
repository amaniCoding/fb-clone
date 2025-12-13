import { UserPostType } from "@/app/api/feeder/[page]/lib";
import OUser_Post from "./original/post";
import UserShare_Post from "./share/post";
import Lower from "../shared/lower";

type PropsTypes = {
  post: UserPostType;
};
export default function UserPost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && (
        <div className="flex flex-col rounded-xl bg-white mb-4">
          <OUser_Post refFrom="post" post={post.oUserPost} />
          <Lower post={post.oUserPost} refFrom="post" />
        </div>
      )}

      {post?.postType === "share" && (
        <div className="flex flex-col rounded-xl bg-white mb-4">
          <UserShare_Post refFrom="post" post={post.userSharePost} />
          <Lower post={post.userSharePost} refFrom="post" />
        </div>
      )}
    </>
  );
}
