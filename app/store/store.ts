import { configureStore } from "@reduxjs/toolkit";
import { feedSlice } from "./slices/feed/feed";
import { addPostSlice } from "./slices/addpost/addpost";
import { postSlice } from "./slices/post/post";
export const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
    addPost: addPostSlice.reducer,
    post: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
