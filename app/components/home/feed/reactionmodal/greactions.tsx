"use client";
import { ReactionType } from "@/app/generated/prisma";
import { useFetchHeaderGreactions } from "@/app/hooks/reactionModal/usefetchgreactions";
import { useAppDispatch } from "@/app/store/hooks";
import { udpateHeader } from "@/app/store/slices/modal/reaction";
import Image from "next/image";
export default function Greactions({
  gReactions,
}: {
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  const dispatch = useAppDispatch();
  const udpateCurrentGReaction = (currentReactionType: ReactionType) => {
    dispatch(
      udpateHeader({
        currentReactionType,
      })
    );
  };
  const { currentReactionType } = useFetchHeaderGreactions();
  return (
    <div className="flex items-center space-x-2">
      {gReactions.map((gr) => {
        return (
          <div
            onClick={() => {
              udpateCurrentGReaction(gr.reactionType);
            }}
            className={`w-10 h-10 rounded-full ${
              currentReactionType === gr.reactionType
                ? "border-b-2 border-b-blue-600 pb-1.5"
                : ""
            }`}
          >
            <Image
              unoptimized
              alt="Amanuel Ferede"
              src={`/reactions/${gr.reactionType}.png`}
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
