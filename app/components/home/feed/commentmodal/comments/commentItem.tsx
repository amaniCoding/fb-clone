import Link from "next/link";
import Image from "next/image";
import { CommentType } from "@/app/api/comments/[refId]/lib";
import Reactions from "../reactions";
import LikeReply from "../lr";
import { ReactionType } from "@/app/generated/prisma/client";
export default function CommentItem({
  comment,
  gReaction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  repliesCount,
}: {
  comment: CommentType;
  gReaction: {
    reactionType: ReactionType;
    count: number;
  }[];
  repliesCount: number;
}) {
  return (
    <div className={`absolute w-full -left-4 -top-4`}>
      <div className="flex flex-row space-x-3">
        <Link href={"/#"} className="flex-none">
          {comment!.user.Profile?.profilePicture ? (
            <Image
              unoptimized
              alt={`${comment!.user.firstName.substring(0, 2)}`}
              src={comment!.user.Profile?.profilePicture}
              width={0}
              height={0}
              sizes="100vh"
              className="w-8 h-8 object-cover rounded-full"
            />
          ) : null}
        </Link>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-100 rounded-2xl p-2">
            <p className="text-sm font-semibold">
              {comment!.user.firstName} {comment!.user.lastName}
            </p>

            {comment.content && (
              <span className=" font-medium">{comment.content}</span>
            )}
            <div id="image">
              {comment.mediaUrl ? (
                <Image
                  alt=""
                  src={comment.mediaUrl}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="cursor-pointer w-52 object-cover block flex-none"
                />
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <LikeReply fromWhat="comment" />

            <Reactions
              reactionsCount={comment._count.reactions}
              gReaction={gReaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
