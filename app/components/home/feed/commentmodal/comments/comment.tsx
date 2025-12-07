import { CommentType } from "@/app/api/comments/[refId]/lib";

import Replies from "../replies/replies";

import Header from "./header";
import { ReactionType } from "@/app/generated/prisma/client";
export default function Comment({
  comment,
  gReactions,
}: {
  comment: CommentType;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="relative">
      <div className="flex flex-col">
        <Header comment={comment} gReactions={gReactions} />
        <Replies
          commentId={comment!.id}
          repliesCount={comment!._count.replies}
        />
      </div>
    </div>
  );
}
