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
      {/* <div className="absolute  -left-3 -top-3 w-full bg-amber-300">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
        doloremque quis, veniam debitis fugit placeat nisi sapiente, pariatur
        quasi, magnam error? Reprehenderit consequatur culpa quos inventore in
        atque minus! Id.
      </div> */}
      <CommentItem
        comment={comment}
        gReaction={gReaction}
        repliesCount={comment!._count.replies}
      />
      <Replies commentId={comment!.id} repliesCount={comment!._count.replies} />
    </div>
  );
}
