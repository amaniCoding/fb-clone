import Replies from "../replyreplies/replies";
import Reactions from "./reactions";
import ReplyItem from "./replyItem";
import { ReactionType } from "@/app/generated/prisma/client";
import LikeReply from "../lr";
import { ReplyType } from "@/app/api/replies/[refId]/lib";

export default function Reply({
  reply,

  gReaction,
  commentId,
}: {
  reply: ReplyType;
  commentId: string;
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
          <LikeReply fromWhat="comment" />
        </div>
        <Replies
          commentId={commentId}
          replyId={reply.id}
          repliesCount={reply!._count.replies}
        />
      </div>
    </div>
  );
}
