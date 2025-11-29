import { ReactionType } from "@/app/generated/prisma";
import { useActionState } from "react";
export type State = {
  success: boolean;
  _gReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;
  reactionType: ReactionType | undefined;
  message: string | undefined;
};
