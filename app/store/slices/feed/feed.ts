import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import { PostType } from "@/app/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

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
  network: {
    isOnline: boolean;
    status: string;
    showNumber: number;
  };
}

const initialState: FeedState = {
  network: {
    isOnline: navigator.onLine,
    status: "",
    showNumber: 0,
  },
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
    setNetWorkError: (
      state,
      action: PayloadAction<{
        isOnline: boolean;
        status: string;
        showNumber: number;
      }>
    ) => {
      state.network = action.payload;
    },
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
      state.feeds.page = state.feeds.page + 1;
    },

    updateTotalPagesAndRows: (
      state,
      action: PayloadAction<{ totalPages: number; totalRows: number }>
    ) => {
      state.feeds.totalPages = action.payload.totalPages;
      state.feeds.totalRows = action.payload.totalRows;
    },
  },
});

export const {
  setNetWorkError,
  setFeeds,
  setLoading,
  addFeed,
  updatePage,
  updateTotalPagesAndRows,
} = feedSlice.actions;

export default feedSlice.reducer;
