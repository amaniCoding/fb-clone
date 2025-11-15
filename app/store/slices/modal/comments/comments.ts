import { oGroupPostCommentType } from "@/app/apis/comments/oGroupPost/[postid]/[page]/lib";
import { oPagePostCommentType } from "@/app/apis/comments/oPagePost/[postid]/[page]/lib";
import { oUserPostCommentType } from "@/app/apis/comments/oUserPost/[postid]/[page]/lib";
import { PageSharePostCommentType } from "@/app/apis/comments/pageSharePost/[postid]/[page]/lib";
import { toGroupSharePostCommentType } from "@/app/apis/comments/toGroupSharePost/[postid]/[page]/lib";
import { userSharePostCommentType } from "@/app/apis/comments/userSharePost/[postid]/[page]/lib";
import {
  OriginalUserPostType,
  OriginalPagePostType,
  OriginalGroupPostType,
  UserSharePostType,
  PageSharePostType,
  ToGroupSharePostType,
} from "@/app/apis/feeder/[page]/lib";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface commentModalState {
  isOpen: boolean;
  currentPost:
    | OriginalUserPostType
    | OriginalPagePostType
    | OriginalGroupPostType
    | UserSharePostType
    | PageSharePostType
    | ToGroupSharePostType
    | undefined;
}

type ShowCommentModalPayload = {
  currentPost:
    | OriginalUserPostType
    | OriginalPagePostType
    | OriginalGroupPostType
    | UserSharePostType
    | PageSharePostType
    | ToGroupSharePostType
    | undefined;
  isOpen: boolean;
  starterUrl: string;
};

type SetCommentActionPayload = {
  comments:
    | oUserPostCommentType
    | oPagePostCommentType
    | oGroupPostCommentType
    | userSharePostCommentType
    | PageSharePostCommentType
    | toGroupSharePostCommentType;
};

const initialState: commentModalState = {
  currentPost: undefined,
  isOpen: false,
};

/**
 * for which i load comment
 * for a apost defined by postid and postype
 */

export const commentModalSlice = createSlice({
  name: "commentModalSlice",
  initialState,
  reducers: {
    showCommentModal: (
      state,
      action: PayloadAction<ShowCommentModalPayload>
    ) => {
      state.currentPost = action.payload.currentPost;
      state.isOpen = action.payload.isOpen;
    },

    setLoading: (state, action: PayloadAction<{ newLoading: boolean }>) => {
      if (state.currentPost) {
        state.currentPost._comments.loading = action.payload.newLoading;
      }
    },

    setComments: (state, action: PayloadAction<SetCommentActionPayload>) => {
      if (state.currentPost) {
        if (action.payload.comments && state.currentPost._comments.comments) {
          state.currentPost._comments.comments = [
            ...state.currentPost._comments.comments,
            ...action.payload.comments,
          ];
        }
      }
    },

    setError: (state, action: PayloadAction<{ newError: string }>) => {
      if (state.currentPost) {
        state.currentPost._comments.error = action.payload.newError;
      }
    },
  },
});

export const { showCommentModal, setLoading, setError } =
  commentModalSlice.actions;

export default commentModalSlice.reducer;
