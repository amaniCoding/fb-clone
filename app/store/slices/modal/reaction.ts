import { ReactorsType } from "@/app/apis/reactions/oUserPost/body/[postid]/[reactiontype]/[page]/lib";
import { ReactionType } from "@/app/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GReactionsResponseType = {
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
};

export type ReactorsResponseType = {
  reactors: ReactorsType;
  totalRows: number;
  totalPages: number;
};
type ReactionsData = {
  refId?: string;
  header?: {
    loading?: boolean;
    gReactions?: {
      reactionType: ReactionType;
      count: number;
    }[];
    error?: string;
    currentReaction?: ReactionType;
  };
  body?: {
    reactionType?: ReactionType;
    loading?: boolean;
    reactors?: ReactorsType;
    error?: string;
    page?: number;
    totalRows?: number;
    totalPages?: number;
  }[];
};

type ShowModalPayLoadType = {
  isOpen: boolean;
  refId: string;
  currentReactionType: ReactionType;
  starterHeaderUrl: string;
  starterBodyUrl: string;
};
// Define a type for the slice state
interface ReactionModalState {
  isOpen: boolean;
  refId?: string;
  reactionsData: ReactionsData[];
  starterHeaderUrl: string;
  starterBodyUrl: string;
}

// Define the initial state using that type
const initialState: ReactionModalState = {
  isOpen: false,
  refId: undefined,
  reactionsData: [],
  starterHeaderUrl: "",
  starterBodyUrl: "",
};

export const reactionModalSlice = createSlice({
  name: "reactionModalSlice",
  initialState,
  reducers: {
    showReactionModal: (state, action: PayloadAction<ShowModalPayLoadType>) => {
      state.isOpen = action.payload.isOpen;
      state.refId = action.payload.refId;
      state.starterHeaderUrl = action.payload.starterHeaderUrl;
      state.starterBodyUrl = action.payload.starterBodyUrl;
      const isShown = state.reactionsData.find((rd) => {
        return rd.refId === action.payload.refId;
      });

      if (!isShown) {
        state.reactionsData.push({
          header: {
            currentReaction: action.payload.currentReactionType,
          },
        });
      } else {
        isShown!.header!.currentReaction = action.payload.currentReactionType;
      }
    },

    fetchingGReactions: (state, action: PayloadAction<boolean>) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });

      currentRef!.header!.loading = action.payload;
    },
    fetchGReactionsSsucceed: (
      state,
      action: PayloadAction<GReactionsResponseType>
    ) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });

      currentRef!.header!.gReactions = action.payload.gReactions;
      const currentReactionType = currentRef?.header?.currentReaction;
      if (!currentRef?.body) {
        currentRef!.body = action.payload.gReactions.map((gr) => {
          return {
            loading: gr.reactionType === currentReactionType ? true : false,
            reactionType: gr.reactionType,
            reactors: [],
          };
        });
      }
    },
    fetchGReactionsFailed: (state, action: PayloadAction<string>) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });
      currentRef!.header!.error = action.payload;
    },
    fetchingReactors: (state, action: PayloadAction<boolean>) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });

      const currentReactionType = currentRef!.header!.currentReaction;

      const currentReactorRef = currentRef!.body!.find((b) => {
        return b.reactionType === currentReactionType;
      });
      currentReactorRef!.loading = action.payload;
    },

    fetchingReactorsSucceed: (
      state,
      action: PayloadAction<ReactorsResponseType>
    ) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });

      const currentReactionType = currentRef!.header!.currentReaction;

      const currentReactorRef = currentRef!.body!.find((b) => {
        return b.reactionType === currentReactionType;
      });
      if (action.payload.reactors && currentReactorRef!.reactors) {
        currentReactorRef!.reactors = [
          ...currentReactorRef!.reactors,
          ...action.payload.reactors,
        ];
      }
      currentReactorRef!.totalPages = action.payload.totalPages;
      currentReactorRef!.totalRows = action.payload.totalRows;
    },

    fetchingReactorsFaild: (state, action: PayloadAction<string>) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });

      const currentReactionType = currentRef!.header!.currentReaction;

      const currentReactorRef = currentRef!.body!.find((b) => {
        return b.reactionType === currentReactionType;
      });
      currentReactorRef!.error = action.payload;
    },

    updatePage: (state, action: PayloadAction<number>) => {
      const currentRef = state.reactionsData.find((rd) => {
        return rd.refId === state.refId;
      });

      const currentReactionType = currentRef!.header!.currentReaction;

      const currentReactorRef = currentRef!.body!.find((b) => {
        return b.reactionType === currentReactionType;
      });
      currentReactorRef!.page = action.payload;
    },
  },
});

export const {
  showReactionModal,
  fetchingGReactions,
  fetchGReactionsSsucceed,
  fetchingReactorsFaild,
  fetchingReactors,
  fetchingReactorsSucceed,
  fetchGReactionsFailed,
  updatePage,
} = reactionModalSlice.actions;

export default reactionModalSlice.reducer;
