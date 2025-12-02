import { ReplyType } from "@/app/apis/replies/oUserPost/[postid]/[commentid]/[page]/lib";
import ReplyReplies from "../replyreplies/replies";
import Content from "./content";
import Lower from "./lower";
import { Ref } from "react";
import { ReactionType } from "@/app/generated/prisma";

export default function Reply({
  reply,
  refId,
  ref,
  gReactions,
}: {
  refId: string;
  reply: ReplyType;
  ref: Ref<HTMLDivElement> | undefined;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="ml-2 flex flex-col" ref={ref}>
      <Content content={reply!.content} mediaUrl={reply!.mediaUrl} />

      <Lower reactionsCount={reply!._count.reactions} gReactions={gReactions} />

      <ReplyReplies
        refId={`${refId}${reply!.id}`}
        replyId={reply!.id}
        repliesCount={reply!._count.replies}
      />
    </div>
  );
}
