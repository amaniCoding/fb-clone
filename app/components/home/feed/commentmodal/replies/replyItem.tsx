import Link from "next/link";
import Image from "next/image";
import { ReplyType } from "@/app/api/replies/[refId]/lib";
import Reactions from "../reactions";
import LikeReply from "../lr";
import { ReactionType } from "@/app/generated/prisma/client";
export default function ReplyItem({
  reply,
  gReaction,
  ref,
}: {
  reply: ReplyType;
  gReaction: {
    reactionType: ReactionType;
    count: number;
  }[];
  ref: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div>
      <div className={`absolute left-7 top-3 z-10`} ref={ref}>
        <div className="flex space-x-3">
          <Link href={"/#"} className="flex-none">
            {reply!.user.Profile?.profilePicture ? (
              <Image
                unoptimized
                alt={`${reply!.user.firstName.substring(0, 2)}`}
                src={reply!.user.Profile?.profilePicture}
                width={0}
                height={0}
                sizes="100vh"
                className="w-7 h-7 object-cover rounded-full"
              />
            ) : null}
          </Link>
          <div className="flex flex-col space-y-1">
            <div className="bg-gray-100 p-2.5 rounded-lg">
              <p>
                {reply!.user.firstName} {reply!.user.lastName}
              </p>

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
      </div>
      <div className="absolute top-0 -left-[0.1rem] w-[2.9rem] h-7 border-b-2 border-gray-300 rounded-lg"></div>
    </div>
  );
}
