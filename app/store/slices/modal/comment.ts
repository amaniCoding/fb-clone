import {
  OGroupPost,
  OPagePost,
  OUserPost,
  ToGroupSharedPost,
  UserSharePost,
  PageSharePost,
} from "@/app/api/feeder/[page]/lib";
import { PostType } from "@/app/generated/prisma/client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShowModalPayLoadType = {
  isOpen: boolean;
  currentPost?: {
    postType: PostType;
    post:
      | OUserPost
      | UserSharePost
      | OPagePost
      | PageSharePost
      | OGroupPost
      | ToGroupSharedPost;
  };
};

// Define a type for the slice state
interface CommentModalState {
  isOpen: boolean;
  currentPost?: {
    postType: PostType;
    post:
      | OUserPost
      | UserSharePost
      | OPagePost
      | PageSharePost
      | OGroupPost
      | ToGroupSharedPost
      | undefined;
  };
}

// Define the initial state using that type
const initialState: CommentModalState = {
  isOpen: false,
};

export const commentModalSlice = createSlice({
  name: "commentModalSlice",
  initialState,
  reducers: {
    showCommentModal: (state, action: PayloadAction<ShowModalPayLoadType>) => {
      state.isOpen = action.payload.isOpen;
      state.currentPost = {
        postType: action.payload.currentPost!.postType,
        post: action.payload.currentPost!.post,
      };
    },
  },
});

export const { showCommentModal } = commentModalSlice.actions;

export default commentModalSlice.reducer;
