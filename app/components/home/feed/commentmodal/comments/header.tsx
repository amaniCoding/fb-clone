import Image from "next/image";
import Commentor from "./commentor";
import Content from "./content";
import Lower from "./lower";
import Link from "next/link";
import { CommentType } from "@/app/apis/comments/oUserPost/[postid]/[page]/lib";
import { ReactionType } from "@/app/generated/prisma";
export default function Header({
  comment,
  gReactions,
}: {
  comment: CommentType;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="px-3.5 py-2 ">
      <div className="flex flex-row space-x-3 bg-yellow-300">
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
            <Content content={comment!.content} mediaUrl={comment!.mediaUrl} />
          </div>
          <Lower
            gReactions={gReactions}
            reactionsCount={comment!._count.reactions}
          />
        </div>
      </div>
    </div>
  );
}
