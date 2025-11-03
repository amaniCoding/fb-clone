import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FeedComment {
  [param: string | number]: any;
}

interface MediaComment {
  [param: string | number]: any;
}
interface commentModalState {
  isOpen: boolean;
  type: "feed" | "media" | undefined;
  feed: FeedComment[];
  media: MediaComment[];
  feedId: string | undefined;
  mediaId: string | undefined;
}

type ShowCommentModalPayload = {
  type: string;
  isOpen: boolean;
  feedId: string;
  mediaId: string | undefined;
};

const initialState: commentModalState = {
  isOpen: false,
  type: undefined,
  feed: [],
  media: [],
  feedId: undefined,
  mediaId: undefined,
};

export const commentModalSlice = createSlice({
  name: "commentModalSlice",
  initialState,
  reducers: {
    showCommentModal: (
      state,
      action: PayloadAction<ShowCommentModalPayload>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      state.feedId = action.payload.feedId;
      state.mediaId = action.payload.mediaId;
    },

    setLoading: (state, action: PayloadAction<{ newLoading: boolean }>) => {
      switch (state.type) {
        case "feed":
          {
            if (!state.feed.find((feed) => feed.feedId === state.feedId)) {
              state.feed.push({
                loading: action.payload.newLoading,
              });
            }
          }

          break;

        default:
          break;
      }
    },
  },
});

export const { showCommentModal } = commentModalSlice.actions;

export default commentModalSlice.reducer;
