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
  currentPost: {
    postType?: PostType;
    oUserPost?: OUserPost;
    userSharePost?: UserSharePost;
    oPagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    toGroupSharedPost?: ToGroupSharedPost;
    oGroupPost?: OGroupPost;
  };
};

// Define a type for the slice state
interface CommentModalState {
  isOpen: boolean;
  currentPost: {
    postType?: PostType;
    userPost?: OUserPost;
    userSharePost?: UserSharePost;
    pagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    groupPost?: OGroupPost;
    groupSharePost?: ToGroupSharedPost;
  };
}

// Define the initial state using that type
const initialState: CommentModalState = {
  isOpen: false,
  currentPost: {},
};

export const commentModalSlice = createSlice({
  name: "commentModalSlice",
  initialState,
  reducers: {
    showCommentModal: (state, action: PayloadAction<ShowModalPayLoadType>) => {
      state.isOpen = action.payload.isOpen;
      if (action.payload.currentPost.postType === "oUserPost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          userPost: action.payload.currentPost.oUserPost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "userSharePost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          userSharePost: action.payload.currentPost.userSharePost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "oPagePost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          pagePost: action.payload.currentPost.oPagePost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "pageSharePost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          pageSharePost: action.payload.currentPost.pageSharePost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "oGroupPost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          groupPost: action.payload.currentPost.oGroupPost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "toGroupSharedPost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          groupSharePost: action.payload.currentPost.toGroupSharedPost,
        };
        return;
      }
    },
  },
});

export const { showCommentModal } = commentModalSlice.actions;

export default commentModalSlice.reducer;
