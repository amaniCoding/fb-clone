import { PostType } from "@/app/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type GroupedReactions = {
  reactionType: string;
  count: string;
};

interface reactionModalState {
  isOpen: boolean;
  feedId: string | undefined;
  actionUpOn: PostType | undefined;
}

type ShowReactionModalPayload = {
  feedId: string;
  actionUpOn: string;
  isOpen: boolean;
  reactionType: string;
};

const initialState: reactionModalState = {
  isOpen: false,
  actionUpOn: undefined,
  feedId: undefined,
};

export const reactionModalSlice = createSlice({
  name: "reactionModalSlice",
  initialState,
  reducers: {
    showReactionModal: (
      state,
      action: PayloadAction<ShowReactionModalPayload>
    ) => {},

    setHeaderLoading: (
      state,
      action: PayloadAction<{ newLoading: boolean }>
    ) => {},

    setHeaderGReactions: (
      state,
      action: PayloadAction<{ gReactions: GroupedReactions[] }>
    ) => {},

    setHeaderError: (state, action: PayloadAction<{ newError: string }>) => {},

    setBodyLoading: (
      state,
      action: PayloadAction<{ newLoading: boolean; reactionType: string }>
    ) => {},

    setBodyReactors: (
      state,
      action: PayloadAction<{ reactors: any[]; reactionType: string }>
    ) => {},

    setBodyError: (
      state,
      action: PayloadAction<{ newError: string; reactionType: string }>
    ) => {},
  },
});

export const {
  setHeaderLoading,
  setHeaderGReactions,
  setHeaderError,
  setBodyLoading,
  setBodyReactors,
  setBodyError,
} = reactionModalSlice.actions;

export default reactionModalSlice.reducer;
