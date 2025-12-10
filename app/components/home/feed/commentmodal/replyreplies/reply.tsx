import { ReactionType } from "@/app/generated/prisma/client";
import ReplyItem from "./replyItem";
import Reactions from "./reactions";
import LikeReply from "../lr";
import { ReplyType } from "@/app/api/replyreplies/[refId]/lib";
export default function Reply({
  reply,

  gReaction,
}: {
  reply: ReplyType;

  gReaction: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="relative">
      <div className="flex flex-col">
        <ReplyItem reply={reply} />

        <div className="flex items-center">
          <Reactions
            gReactions={gReaction}
            reactionsCount={reply._count.reactions}
          />
          <LikeReply fromWhat="replyreply" />
        </div>
      </div>
    </div>
  );
}
