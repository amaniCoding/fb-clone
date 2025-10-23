import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsUser } from "@/app/components/home/feed/types";

interface UploadedMediaType {
  url: string;
  type: string;
}
// Define a type for the slice state
interface FeedState {
  feeds: {
    loading: boolean;
    page: number;
    feeds: PostsUser[] | undefined;
    totalRows: number;
    totalPages: number;
  };
  network: {
    isOnline: boolean;
    status: string;
    showNumber: number;
  };
}

// Define the initial state using that type
const initialState: FeedState = {
  network: {
    isOnline: navigator.onLine,
    status: "",
    showNumber: 0,
  },
  feeds: {
    feeds: [],
    loading: false,
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

    setFeeds: (state, action: PayloadAction<PostsUser[]>) => {
      state.feeds.feeds = [...state.feeds.feeds!, ...action.payload];
    },

    addFeed: (state, action: PayloadAction<PostsUser | undefined>) => {
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
