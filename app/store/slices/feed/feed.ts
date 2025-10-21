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
    feeds: PostsUser[] | null;
  };
  network: {
    isOnline: boolean;
    status: string;
    showNumber: "once" | "more" | "";
  };
}

// Define the initial state using that type
const initialState: FeedState = {
  network: {
    isOnline: navigator.onLine,
    status: "",
    showNumber: "",
  },
  feeds: {
    feeds: [],
    loading: false,
    page: 1,
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
        showNumber: "once" | "more" | "";
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
  },
});

export const { setNetWorkError, setFeeds, setLoading, addFeed } =
  feedSlice.actions;

export default feedSlice.reducer;
