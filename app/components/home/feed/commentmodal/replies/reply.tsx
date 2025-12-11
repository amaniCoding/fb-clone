import ReplyItem from "./replyItem";
import { ReactionType } from "@/app/generated/prisma/client";
import { ReplyType } from "@/app/api/replies/[refId]/lib";
import Replies from "./replies";

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
    <div className="absolute -bottom-3.5 left-5 bg-white w-full">
      <div className="flex flex-col space-y-1.5">
        <ReplyItem reply={reply} gReaction={gReaction} />

        <Replies
          commentId={commentId}
          replyId={reply.id}
          repliesCount={reply!._count.replies}
        />
      </div>
    </div>
  );
}
