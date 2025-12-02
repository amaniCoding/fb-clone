import Content from "./content";
import { ReplyType } from "@/app/apis/replies/oUserPost/[postid]/[commentid]/[page]/lib";
import Lower from "./lower";
import { Ref } from "react";
import { ReactionType } from "@/app/generated/prisma";
export default function Reply({
  reply,
  ref,
  gReactions,
  reactionsCount,
}: {
  reply: ReplyType;
  reactionsCount: number;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
  ref: Ref<HTMLDivElement> | undefined;
}) {
  return (
    <div className="ml-2 flex flex-col" ref={ref}>
      <Content content={reply!.content} mediaUrl={reply!.mediaUrl} />
      <Lower gReactions={gReactions} reactionsCount={reactionsCount} />
    </div>
  );
}
