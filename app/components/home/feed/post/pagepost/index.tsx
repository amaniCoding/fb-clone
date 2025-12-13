import { PagePostType } from "@/app/api/feeder/[page]/lib";
import OPage_Post from "./original/post";
import PageShare_Post from "./share/post";
import Lower from "../shared/lower";

type PropsTypes = {
  post: PagePostType;
};
export default function PagePost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && (
        <div className="flex flex-col space-y-1.5">
          <OPage_Post refFrom="post" post={post.oPagePost} />
          <Lower post={post.oPagePost} refFrom="post" />
        </div>
      )}

      {post?.postType === "share" && (
        <div className="flex flex-col space-y-1.5">
          <PageShare_Post refFrom="post" post={post.pageSharePost} />
          <Lower post={post.pageSharePost} refFrom="post" />
        </div>
      )}
    </>
  );
}
