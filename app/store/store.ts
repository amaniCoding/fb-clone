import { configureStore } from "@reduxjs/toolkit";
import { feedSlice } from "./slices/feed/feed";
import { addPostSlice } from "./slices/addpost/addpost";
import { postSlice } from "./slices/post/post";
import { commentModalSlice } from "./slices/modal/comment";
import { reactionModalSlice } from "./slices/modal/reaction";
import { appSlice } from "./slices/app/app";

export const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
    addPost: addPostSlice.reducer,
    post: postSlice.reducer,
    commentModal: commentModalSlice.reducer,
    reactionModal: reactionModalSlice.reducer,
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
