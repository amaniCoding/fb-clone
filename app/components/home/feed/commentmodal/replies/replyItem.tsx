import Link from "next/link";
import Image from "next/image";
import { ReplyType } from "@/app/api/replies/[refId]/lib";
import Reactions from "../reactions";
import LikeReply from "../lr";
import { ReactionType } from "@/app/generated/prisma/client";
export default function ReplyItem({
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
    <div className={`absolute w-full -left-4 -top-4`}>
      <Link href={"/#"} className="flex-none">
        {reply!.user.Profile?.profilePicture ? (
          <Image
            unoptimized
            alt={`${reply!.user.firstName.substring(0, 2)}`}
            src={reply!.user.Profile?.profilePicture}
            width={0}
            height={0}
            sizes="100vh"
            className="w-5 h-5 object-cover rounded-full"
          />
        ) : null}
      </Link>
      <div className="flex flex-col space-y-1">
        <p>
          {reply!.user.firstName} {reply!.user.lastName}
        </p>
        <div>
          {reply.content && <p>{reply.content}</p>}
          {reply.mediaUrl ? (
            <Image
              alt=""
              src={reply.mediaUrl}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-52 object-cover block flex-none"
            />
          ) : null}
        </div>
        <div className="flex items-center">
          <Reactions
            gReaction={gReaction}
            reactionsCount={reply._count.reactions}
          />
          <LikeReply fromWhat="reply" />
        </div>
      </div>
    </div>
  );
}
