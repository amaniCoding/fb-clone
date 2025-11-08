"use client";
import { Prisma, ReactionType } from "@/app/generated/prisma";
import Image from "next/image";
export default function Upper({
  comments,
  reactions,
  groupedReactions,
  firtReactions,
}: {
  comments: number;
  reactions: number;
  groupedReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;

  firtReactions: {
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
}) {
  const newRxn = groupedReactions
    ? [...groupedReactions!].sort((a, b) => b.count - a.count)
    : [];
  const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;
  return (
    <div className="px-3">
      <div className="flex items-center justify-between pb-2">
        {groupedReactions!?.length > 0 && (
          <div className="flex items-center space-x-1 fill-gray-500">
            <div className="flex items-center -space-x-1.5">
              {newRxn_x.map((rxn, index) => (
                <Image
                  key={index}
                  alt=""
                  src={`/reactions/${rxn.reactionType}.png`}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                />
              ))}
            </div>
            <p className="text-gray-500">{reactions}</p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <p className="text-gray-500">{comments}</p>

          {/* <p className="text-gray-500">1k shares</p> */}
        </div>
      </div>
    </div>
  );
}
