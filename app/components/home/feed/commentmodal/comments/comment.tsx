import { CommentType } from "@/app/api/comments/[refId]/lib";
import { ReactionType } from "@/app/generated/prisma/client";
import CommentItem from "./commentItem";
import Replies from "../replies/replies";
export default function Comment({
  comment,
  gReaction,
}: {
  comment: CommentType;
  gReaction: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div
      className={` mb-10 h-auto w-full ${
        comment._count.replies > 0
          ? "border-l-2 border-b-2 border-b-gray-300    border-l-gray-300 rounded-bl-xl"
          : " border-l-2 border-b-2 border-b-gray-300    border-l-gray-300 rounded-bl-xl "
      } `}
    >
      <CommentItem
        comment={comment}
        gReaction={gReaction}
        repliesCount={comment!._count.replies}
      />
      <Replies commentId={comment!.id} repliesCount={comment!._count.replies} />
    </div>
  );
}
