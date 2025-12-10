import { CommentType } from "@/app/api/comments/[refId]/lib";
import Replies from "../replies/replies";
import { ReactionType } from "@/app/generated/prisma/client";
import CommentItem from "./commentItem";
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
    <div className="relative">
      <div className="flex flex-col space-y-1.5 border-l border-l-gray-300 relative ">
        <CommentItem comment={comment} gReaction={gReaction} />
        <div className="absolute right-1 border-r border-r-gray-300">
          <div className="relative">
            <Replies
              commentId={comment!.id}
              repliesCount={comment!._count.replies}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
