import { PagePostType } from "@/app/api/feeder/[page]/lib";
import OPage_Post from "./original/post";
import PageShare_Post from "./share/post";

type PropsTypes = {
  post: PagePostType;
};
export default function PagePost({ post }: PropsTypes) {
  return (
    <>
      {post?.postType === "original" && (
        <OPage_Post refFrom="post" post={post.oPagePost} />
      )}

      {post?.postType === "share" && (
        <PageShare_Post refFrom="post" post={post.pageSharePost} />
      )}
    </>
  );
}
