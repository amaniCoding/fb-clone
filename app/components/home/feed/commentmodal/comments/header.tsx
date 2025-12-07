import Lower from "./lower";

import { CommentType } from "@/app/api/comments/[refId]/lib";
import Upper from "./upper";
import Profile from "./profile";
import { ReactionType } from "@/app/generated/prisma/client";
export default function Header({
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
    <div className="flex flex-row space-x-3 bg-yellow-300">
      <Profile comment={comment} />

      <div className="flex flex-col space-y-1">
        <Upper comment={comment} />
        <Lower
          gReactions={gReactions}
          reactionsCount={comment!._count.reactions}
        />
      </div>
    </div>
  );
}
