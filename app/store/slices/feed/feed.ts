import { FeedsType } from "@/app/api/feeder/[page]/lib";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FeedResponseType = {
  feeds: FeedsType[];
  totalRows: number;
  totalPages: number;
};
// Define a type for the slice state
interface FeedState {
  feeds: {
    loading: boolean;
    page: number;
    feeds: FeedsType[] | undefined;
    totalRows: number;
    totalPages: number;
  };
}

const initialState: FeedState = {
  feeds: {
    feeds: [],
    loading: true,
    page: 1,
    totalPages: 0,
    totalRows: 0,
  },
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.feeds.loading = action.payload;
    },

    setFeeds: (state, action: PayloadAction<FeedResponseType>) => {
      state.feeds.totalPages = action.payload.totalPages;
      state.feeds.totalRows = action.payload.totalRows;

      state.feeds.feeds = [...state.feeds.feeds!, ...action.payload.feeds];
    },

    addFeed: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    updatePage: (state, action: PayloadAction<number>) => {
      state.feeds.page = action.payload + 1;
    },
  },
});

export const { setFeeds, setLoading, addFeed, updatePage } = feedSlice.actions;

export default feedSlice.reducer;
