import { CommentType } from "@/app/apis/feed/comments/[feedid]/[postid]/[page]/lib";
import {
  GroupPostType,
  PagePostType,
  PageSharePostType,
  ToGroupSharePostType,
  UserPostType,
  UserSharePostType,
} from "@/app/apis/feeder/[page]/lib";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type commentParams = {
  id?: string;
  url?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  totalRows?: number;
  totalPages?: number;
  comments?: any[];
};

interface commentModalState {
  isOpen: boolean;
  post:
    | UserPostType
    | PagePostType
    | GroupPostType
    | UserSharePostType
    | PageSharePostType
    | ToGroupSharePostType
    | undefined;
  id: string | undefined;
  commentsShown: commentParams[];
}

type ShowCommentModalPayload = {
  post:
    | UserPostType
    | PagePostType
    | GroupPostType
    | UserSharePostType
    | PageSharePostType
    | ToGroupSharePostType
    | undefined;
  id: string;
  isOpen: boolean;
  urlStart: string;
};

const initialState: commentModalState = {
  post: undefined,
  isOpen: false,
  commentsShown: [],
  id: undefined,
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
      state.post = action.payload.post;
      state.isOpen = action.payload.isOpen;
      state.id = action.payload.id;
      const currentComment = state.commentsShown.find(
        (comment) => comment.id === action.payload.id
      );
      if (!currentComment) {
        state.commentsShown.push({
          // now this id is in
          id: state.id,
          loading: false,
          page: 1,
          error: undefined,
          totalRows: 0,
          totalPages: 0,
          url: action.payload.urlStart,
          comments: [],
        });
      }
    },

    setLoading: (state, action: PayloadAction<{ newLoading: boolean }>) => {
      const currentComment = state.commentsShown.find(
        (comment) => comment.id === state.id
      );
      if (currentComment) {
        currentComment.loading = action.payload.newLoading;
      }
    },

    setComments: (state, action: PayloadAction<{ comments: CommentType }>) => {
      const currentComment = state.commentsShown.find(
        (comment) => comment.id === state.id
      );
      if (currentComment) {
        currentComment.comments = [
          ...currentComment.comments!,
          ...action.payload.comments,
        ];
      }
    },

    setError: (state, action: PayloadAction<{ newError: string }>) => {
      const currentComment = state.commentsShown.find(
        (comment) => comment.id === state.id
      );
      if (currentComment) {
        currentComment.error = action.payload.newError;
      }
    },
  },
});

export const { showCommentModal, setLoading, setError } =
  commentModalSlice.actions;

export default commentModalSlice.reducer;
