import { CommentType } from "@/app/api/comments/[refId]/lib";
import Replies from "../replies/replies";
import { ReactionType } from "@/app/generated/prisma/client";
import CommentItem from "./commentItem";
import Reactions from "./reactions";
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
      <div className="flex flex-col">
        <CommentItem comment={comment} />
        <Reactions
          gReactions={gReaction}
          reactionsCount={comment._count.reactions}
        />
        <Replies
          commentId={comment!.id}
          repliesCount={comment!._count.replies}
        />
      </div>
    </div>
  );
}
