import { ReplyType } from "@/app/api/replies/[refId]/lib";
import Content from "./content";
import Lower from "./lower";
import { ReactionType } from "@/app/generated/prisma/client";
export default function Reply({
  reply,

  gReactions,
}: {
  reply: ReplyType;

  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="ml-2 flex flex-col">
      <Content content={reply!.content} mediaUrl={reply!.mediaUrl} />
      <Lower gReactions={gReactions} reactionsCount={reply!._count.reactions} />
    </div>
  );
}
