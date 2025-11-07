import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type GroupedReactions = {
  reactionType: string;
  count: string;
};
type ReactorsData = {
  reactionType?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  totalRows?: number;
  totalPages?: number;
  reactors?: any[];
};
type reactionsParams = {
  id?: string;
  header?: {
    currentReactionType?: string;
    loading?: boolean;
    page?: number;
    error?: string;
    gReactions?: GroupedReactions[];
  };

  body?: ReactorsData[];
};

interface reactionModalState {
  isOpen?: boolean;
  currentReactionType?: string;
  id?: string;
  reactionsShown?: reactionsParams[];
}

type ShowReactionModalPayload = {
  id: string;
  isOpen: boolean;
  reactionType: string;
};

const initialState: reactionModalState = {
  isOpen: false,
  reactionsShown: [],
};

/**
 * for which i load comment
 * for a apost defined by postid and postype
 */

export const reactionModalSlice = createSlice({
  name: "reactionModalSlice",
  initialState,
  reducers: {
    showReactionModal: (
      state,
      action: PayloadAction<ShowReactionModalPayload>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.id = action.payload.id;

      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === action.payload.id
      );
      if (!currentReaction) {
        state.reactionsShown!.push({
          id: state.id,
          header: {
            loading: false,
            page: 1,
            error: undefined,
            currentReactionType: state.currentReactionType,
            gReactions: [],
          },
          body: [],
        });
      }
    },

    setHeaderLoading: (
      state,
      action: PayloadAction<{ newLoading: boolean }>
    ) => {
      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === state.id
      );
      if (currentReaction) {
        currentReaction.header!.loading = action.payload.newLoading;
      }
    },

    setHeaderGReactions: (
      state,
      action: PayloadAction<{ gReactions: GroupedReactions[] }>
    ) => {
      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === state.id
      );
      if (currentReaction) {
        currentReaction.header!.gReactions = action.payload.gReactions;
        // prepare data
        // the state may not be updated quickly but test it
        // currentReaction.header!.gReactions.map
        const data = action.payload.gReactions.map((rxn): ReactorsData => {
          return {
            reactionType: rxn.reactionType,
            loading: false,
            error: undefined,
            page: 1,
            totalPages: 0,
            totalRows: 0,
            reactors: [],
          };
        });
        currentReaction.body = data;
      }
    },

    setHeaderError: (state, action: PayloadAction<{ newError: string }>) => {
      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === state.id
      );
      if (currentReaction) {
        currentReaction.header!.error = action.payload.newError;
      }
    },

    setBodyLoading: (
      state,
      action: PayloadAction<{ newLoading: boolean; reactionType: string }>
    ) => {
      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === state.id
      );

      const currentReactors = currentReaction!.body?.find(
        (rxn) => rxn.reactionType === action.payload.reactionType
      );
      currentReactors!.loading = action.payload.newLoading;
    },

    setBodyReactors: (
      state,
      action: PayloadAction<{ reactors: any[]; reactionType: string }>
    ) => {
      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === state.id
      );

      const currentReactors = currentReaction!.body?.find(
        (rxn) => rxn.reactionType === action.payload.reactionType
      );
      currentReactors!.reactors = [
        ...currentReactors!.reactors!,
        ...action.payload.reactors,
      ];
    },

    setBodyError: (
      state,
      action: PayloadAction<{ newError: string; reactionType: string }>
    ) => {
      const currentReaction = state.reactionsShown!.find(
        (reaction) => reaction.id === state.id
      );

      const currentReactors = currentReaction!.body?.find(
        (rxn) => rxn.reactionType === action.payload.reactionType
      );
      currentReactors!.error = action.payload.newError;
    },
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
