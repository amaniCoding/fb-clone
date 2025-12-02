import { CommentType } from "@/app/apis/comments/oUserPost/[postid]/[page]/lib";
import Image from "next/image";
import { Ref } from "react";
import Commentor from "./commentor";
import Content from "./content";
import Replies from "../replies/replies";
import { ReactionType } from "@/app/generated/prisma";
import Link from "next/link";
import Lower from "./lower";
export default function Comment({
  comment,
  gReactions,
  currentParentRefId,
  ref,
}: {
  comment: CommentType;
  ref: Ref<HTMLDivElement> | undefined;
  currentParentRefId: string | undefined;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="relative">
      <div className="flex flex-col">
        <div className="px-3.5 py-2 ">
          <div className="flex flex-row space-x-3 bg-yellow-300" ref={ref}>
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
              <div className="bg-gray-100 p-2 rounded-xl flex flex-col">
                <Commentor
                  firstName={comment!.user.firstName}
                  lastName={comment!.user.lastName}
                />
                <Content
                  content={comment!.content}
                  mediaUrl={comment!.mediaUrl}
                />
              </div>
              <Lower
                gReactions={gReactions}
                reactionsCount={comment!._count.reactions}
              />
            </div>
          </div>

          <Replies
            refId={`${currentParentRefId}${comment!.id}`}
            commentId={comment!.id}
            repliesCount={comment!._count.replies}
          />
        </div>
      </div>
    </div>
  );
}
