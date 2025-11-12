import { PagePostType } from "@/app/apis/feeder/[page]/lib";

type PagePostProps = {
  post: PagePostType;
  feedId: string;
};
export default function PagePost({ post, feedId }: PagePostProps) {
  return <>{post?.oPagePost?.page.name}</>;
}
