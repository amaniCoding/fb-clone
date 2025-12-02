import { CommentType } from "@/app/api/comments/oUserPost/[postid]/[page]/lib";
import { Ref } from "react";

import Replies from "../replies/replies";
import { ReactionType } from "@/app/generated/prisma";

import Header from "./header";
import Commentor from "./commentor";
export default function Comment({
  comment,
  gReactions,
  currentParentRefId,
  ref,
}: {
  comment: CommentType;
  ref: Ref<HTMLDivElement> | undefined;
  currentParentRefId: string | undefined;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="relative" ref={ref}>
      <div className="flex flex-col">
        <Header comment={comment} gReactions={gReactions} />
        <Replies
          refId={`${currentParentRefId}${comment!.id}`}
          commentId={comment!.id}
          repliesCount={comment!._count.replies}
        />
      </div>
    </div>
  );
}
