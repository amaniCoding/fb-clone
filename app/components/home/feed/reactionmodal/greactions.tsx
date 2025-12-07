"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { udpateCurrentReactionType } from "@/app/store/slices/modal/reaction";
import { ReactionType } from "@/app/generated/prisma/client";
import Image from "next/image";
export default function Greactions({
  gReactions,
}: {
  gReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;
}) {
  const currentReactionType = useAppSelector(
    (state) => state.reactionModal.currentReactionType
  );
  const dispatch = useAppDispatch();
  const udpateCurrentGReaction = (currentReactionType: ReactionType) => {
    dispatch(udpateCurrentReactionType(currentReactionType));
  };
  return (
    <div className="flex items-center space-x-2">
      {gReactions!.map((gr, index) => {
        return (
          <div
            key={index}
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
