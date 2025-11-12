import { GroupPostType } from "@/app/apis/feeder/[page]/lib";

type GroupPostProps = {
  post: GroupPostType;
  feedId: string;
};
export default function GroupPost({ post, feedId }: GroupPostProps) {
  return <>{post?.oGroupPost?.user.firstName}</>;
}
