import { PagePostType, UserPostType } from "@/app/apis/feeder/[page]/lib";
import Share from "./share/post";
import Original from "./original/post";

type PagePostProps = {
  post: PagePostType;
  feedId: string;
};
export default function PagePost({ post, feedId }: PagePostProps) {
  return (
    <>
      {post?.postType === "original" && (
        <Original post={post.oPagePost} feedId={feedId} />
      )}

      {post?.postType === "share" && (
        <Share post={post.pageSharePost} feedId={feedId} />
      )}
    </>
  );
}
