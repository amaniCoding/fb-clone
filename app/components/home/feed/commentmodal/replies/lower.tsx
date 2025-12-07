import Image from "next/image";
import Left from "../shared/lower";
import { ReactionType } from "@/app/generated/prisma/client";
export default function Lower({
  reactionsCount,
  gReactions,
  repliesCount,
}: {
  reactionsCount: number;
  repliesCount: number;
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="flex items-center justify-between space-x-5">
      <Left fromWhat="reply" />
      <div className="flex items-center">
        <p className="text-gray-500">{reactionsCount}</p>
        <p className="text-gray-500">{repliesCount}</p>

        <div className="flex items-center -space-x-1.5">
          {gReactions.map((rxn, index) =>
            rxn.reactionType ? (
              <Image
                key={index}
                alt=""
                src={`/reactions/${rxn.reactionType}.png`}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
