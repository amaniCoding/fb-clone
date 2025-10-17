import { configureStore } from "@reduxjs/toolkit";
import { feedSlice } from "./slices/feed";

export const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
