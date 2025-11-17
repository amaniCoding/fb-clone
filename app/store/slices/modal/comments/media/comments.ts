import { MediaCommentType } from "@/app/apis/comments/media/oUserPost/[postid]/[mediaid]/[page]/lib";
import { PostType } from "@/app/generated/prisma";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface commentModalState {
  feedId: string | undefined;
  mediaId: string | undefined;
  actionUpOn: PostType | undefined;
  isOpen: boolean;
  starterUrl: string | undefined;
}

type ShowCommentModalPayload = {
  mediaId: string | undefined;
  feedId: string | undefined;
  actionUpOn: PostType;
  isOpen: boolean;
  starterUrl: string | undefined;
};

type SetCommentActionPayload = {
  comments: MediaCommentType;
};

const initialState: commentModalState = {
  feedId: undefined,
  mediaId: undefined,
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
              const currentMedia = currentFeed.userPost.oUserPost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                currentMedia._comments.loading = action.payload.newLoading;
              }
            }
          }
          break;

        case "oPagePost":
          {
            if (currentFeed) {
              const currentMedia = currentFeed.pagePost.oPagePost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                currentMedia._comments.loading = action.payload.newLoading;
              }
            }
          }
          break;

        case "oGroupPost":
          {
            if (currentFeed) {
              const currentMedia = currentFeed.groupPost.oGroupPost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                currentMedia._comments.loading = action.payload.newLoading;
              }
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
              const currentMedia = currentFeed.userPost.oUserPost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                if (
                  currentMedia._comments.comments &&
                  action.payload.comments
                ) {
                  currentMedia._comments.comments = [
                    ...currentMedia._comments.comments,
                    ...action.payload.comments,
                  ];
                }
              }
            }
          }
          break;

        case "oPagePost":
          {
            if (currentFeed) {
              const currentMedia = currentFeed.pagePost.oPagePost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                if (
                  currentMedia._comments.comments &&
                  action.payload.comments
                ) {
                  currentMedia._comments.comments = [
                    ...currentMedia._comments.comments,
                    ...action.payload.comments,
                  ];
                }
              }
            }
          }
          break;

        case "oGroupPost":
          {
            if (currentFeed) {
              const currentMedia = currentFeed.groupPost.oGroupPost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                if (
                  currentMedia._comments.comments &&
                  action.payload.comments
                ) {
                  currentMedia._comments.comments = [
                    ...currentMedia._comments.comments,
                    ...action.payload.comments,
                  ];
                }
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
              const currentMedia = currentFeed.userPost.oUserPost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                currentMedia._comments.error = action.payload.newError;
              }
            }
          }
          break;

        case "oPagePost":
          {
            if (currentFeed) {
              const currentMedia = currentFeed.pagePost.oPagePost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                currentMedia._comments.error = action.payload.newError;
              }
            }
          }

          break;

        case "oGroupPost":
          {
            if (currentFeed) {
              const currentMedia = currentFeed.groupPost.oGroupPost.medias.find(
                (media) => {
                  return media.id === state.mediaId;
                }
              );

              if (currentMedia) {
                currentMedia._comments.error = action.payload.newError;
              }
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
