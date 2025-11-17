import { oGroupPostCommentType } from "@/app/apis/comments/oGroupPost/[postid]/[page]/lib";
import { oPagePostCommentType } from "@/app/apis/comments/oPagePost/[postid]/[page]/lib";
import { oUserPostCommentType } from "@/app/apis/comments/oUserPost/[postid]/[page]/lib";
import { PageSharePostCommentType } from "@/app/apis/comments/pageSharePost/[postid]/[page]/lib";
import { toGroupSharePostCommentType } from "@/app/apis/comments/toGroupSharePost/[postid]/[page]/lib";
import { userSharePostCommentType } from "@/app/apis/comments/userSharePost/[postid]/[page]/lib";

import { PostType } from "@/app/generated/prisma";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface commentModalState {
  feedId: string | undefined;
  actionUpOn: PostType | undefined;
  isOpen: boolean;
  starterUrl: string | undefined;
}

type ShowCommentModalPayload = {
  feedId: string | undefined;
  actionUpOn: PostType;
  isOpen: boolean;
  starterUrl: string | undefined;
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
  feedId: undefined,
  actionUpOn: undefined,
  starterUrl: undefined,
  isOpen: false,
};

/**
 * for which i load comment
 * for a apost defined by postid and postype
 */
const dispatch = useAppDispatch();
const feeds = useAppSelector((state) => state.feed.feeds.feeds);

export const commentModalSlice = createSlice({
  name: "commentModalSlice",
  initialState,
  reducers: {
    showCommentModal: (
      state,
      action: PayloadAction<ShowCommentModalPayload>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.feedId = action.payload.feedId;
      state.actionUpOn = action.payload.actionUpOn;
      state.starterUrl = action.payload.starterUrl;
    },

    setLoading: (state, action: PayloadAction<{ newLoading: boolean }>) => {
      const currentFeed = feeds?.find((feed) => {
        feed.id === state.feedId;
      });
      switch (state.actionUpOn) {
        case "oUserPost":
          {
            if (currentFeed) {
              currentFeed.userPost.oUserPost._comments.loading =
                action.payload.newLoading;
            }
          }
          break;

        case "userSharePost":
          {
            if (currentFeed) {
              currentFeed.userPost.userSharePost._comments.loading =
                action.payload.newLoading;
            }
          }

          break;

        case "oPagePost":
          {
            if (currentFeed) {
              currentFeed.pagePost.oPagePost._comments.loading =
                action.payload.newLoading;
            }
          }
          break;

        case "pageSharePost":
          {
            if (currentFeed) {
              currentFeed.pagePost.pageSharePost._comments.loading =
                action.payload.newLoading;
            }
          }
          break;

        case "oGroupPost":
          {
            if (currentFeed) {
              currentFeed.groupPost.oGroupPost._comments.loading =
                action.payload.newLoading;
            }
          }

          break;

        case "toGroupSharedPost":
          {
            if (currentFeed) {
              currentFeed.groupPost.toGroupSharedPost._comments.loading =
                action.payload.newLoading;
            }
          }

          break;

        default:
          break;
      }
    },

    setComments: (state, action: PayloadAction<SetCommentActionPayload>) => {
      const currentFeed = feeds?.find((feed) => {
        feed.id === state.feedId;
      });
      switch (state.actionUpOn) {
        case "oUserPost":
          {
            if (currentFeed) {
              if (
                currentFeed.userPost.oUserPost._comments.comments &&
                action.payload.comments
              ) {
                currentFeed.userPost.oUserPost._comments.comments = [
                  ...currentFeed.userPost.oUserPost._comments.comments,
                  ...action.payload.comments,
                ];
              }
            }
          }
          break;

        case "userSharePost":
          {
            if (currentFeed) {
              if (
                currentFeed.userPost.userSharePost._comments.comments &&
                action.payload.comments
              ) {
                currentFeed.userPost.userSharePost._comments.comments = [
                  ...currentFeed.userPost.userSharePost._comments.comments,
                  ...action.payload.comments,
                ];
              }
            }
          }

          break;

        case "oPagePost":
          {
            if (currentFeed) {
              if (
                currentFeed.pagePost.oPagePost._comments.comments &&
                action.payload.comments
              ) {
                currentFeed.pagePost.oPagePost._comments.comments = [
                  ...currentFeed.pagePost.oPagePost._comments.comments,
                  ...action.payload.comments,
                ];
              }
            }
          }
          break;

        case "pageSharePost":
          {
            if (currentFeed) {
              if (
                currentFeed.pagePost.pageSharePost._comments.comments &&
                action.payload.comments
              ) {
                currentFeed.pagePost.pageSharePost._comments.comments = [
                  ...currentFeed.pagePost.pageSharePost._comments.comments,
                  ...action.payload.comments,
                ];
              }
            }
          }
          break;

        case "oGroupPost":
          {
            if (currentFeed) {
              if (
                currentFeed.groupPost.oGroupPost._comments.comments &&
                action.payload.comments
              ) {
                currentFeed.groupPost.oGroupPost._comments.comments = [
                  ...currentFeed.groupPost.oGroupPost._comments.comments,
                  ...action.payload.comments,
                ];
              }
            }
          }

          break;

        case "toGroupSharedPost":
          {
            if (currentFeed) {
              if (
                currentFeed.groupPost.toGroupSharedPost._comments.comments &&
                action.payload.comments
              ) {
                currentFeed.groupPost.toGroupSharedPost._comments.comments = [
                  ...currentFeed.groupPost.toGroupSharedPost._comments.comments,
                  ...action.payload.comments,
                ];
              }
            }
          }

          break;

        default:
          break;
      }
    },

    setError: (state, action: PayloadAction<{ newError: string }>) => {
      const currentFeed = feeds?.find((feed) => {
        feed.id === state.feedId;
      });
      switch (state.actionUpOn) {
        case "oUserPost":
          {
            if (currentFeed) {
              currentFeed.userPost.oUserPost._comments.error =
                action.payload.newError;
            }
          }
          break;

        case "userSharePost":
          {
            if (currentFeed) {
              currentFeed.userPost.userSharePost._comments.error =
                action.payload.newError;
            }
          }

          break;

        case "oPagePost":
          {
            if (currentFeed) {
              currentFeed.pagePost.oPagePost._comments.error =
                action.payload.newError;
            }
          }
          break;

        case "pageSharePost":
          {
            if (currentFeed) {
              currentFeed.pagePost.pageSharePost._comments.error =
                action.payload.newError;
            }
          }
          break;

        case "oGroupPost":
          {
            if (currentFeed) {
              currentFeed.groupPost.oGroupPost._comments.error =
                action.payload.newError;
            }
          }

          break;

        case "toGroupSharedPost":
          {
            if (currentFeed) {
              currentFeed.groupPost.toGroupSharedPost._comments.error =
                action.payload.newError;
            }
          }

          break;

        default:
          break;
      }
    },
  },
});

export const { showCommentModal, setLoading, setError } =
  commentModalSlice.actions;

export default commentModalSlice.reducer;
