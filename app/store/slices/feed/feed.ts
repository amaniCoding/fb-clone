import { oGroupPostCommentType } from "@/app/apis/comments/oGroupPost/[postid]/[page]/lib";
import { oPagePostCommentType } from "@/app/apis/comments/oPagePost/[postid]/[page]/lib";
import { oUserPostCommentType } from "@/app/apis/comments/oUserPost/[postid]/[page]/lib";
import { PageSharePostCommentType } from "@/app/apis/comments/pageSharePost/[postid]/[page]/lib";
import { toGroupSharePostCommentType } from "@/app/apis/comments/toGroupSharePost/[postid]/[page]/lib";
import { userSharePostCommentType } from "@/app/apis/comments/userSharePost/[postid]/[page]/lib";
import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import { PostType } from "@/app/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

type SetCommentActionPayload = {
  comments:
    | oUserPostCommentType
    | oPagePostCommentType
    | oGroupPostCommentType
    | userSharePostCommentType
    | PageSharePostCommentType
    | toGroupSharePostCommentType;
};
type ShowCommentModalPayload = {
  feedId: string | undefined;
  actionUpOn: PostType;
  isOpen: boolean;
  starterUrl: string | undefined;
};

type ShowReactionModal = {
  fromWhat: "feed" | "comment" | "reply" | "replyreply";
  currentReactionType: undefined;
  feedId: string | undefined;
  commentId: string | undefined;
  replyId: string | undefined;
  replyReplyId: string | undefined;
  actionUpOn: PostType;
  isOpen: boolean;
  starterUrl: string | undefined;
};
export type FeedResponseType = {
  feeds: FeedsType[];
  totalRows: number;
  totalPages: number;
};
// Define a type for the slice state
interface FeedState {
  commentModal: {
    feedId: string | undefined;
    actionUpOn: PostType | undefined;
    starterUrl: string | undefined;
    isOpen: boolean;
  };

  reactionModal: {
    fromWhat: "feed" | "comment" | "reply" | "replyreply" | undefined;
    feedId: string | undefined;
    commentId: string | undefined;
    replyId: string | undefined;
    replyReplyId: string | undefined;
    actionUpOn: PostType | undefined;
    starterUrl: string | undefined;
    isOpen: boolean;
  };
  feeds: {
    loading: boolean;
    page: number;
    feeds: FeedsType[] | undefined;
    totalRows: number;
    totalPages: number;
  };
  network: {
    isOnline: boolean;
    status: string;
    showNumber: number;
  };
}

// Define the initial state using that type
const initialState: FeedState = {
  commentModal: {
    actionUpOn: undefined,
    feedId: undefined,
    isOpen: false,
    starterUrl: undefined,
  },

  reactionModal: {
    fromWhat: undefined,
    actionUpOn: undefined,
    feedId: undefined,
    isOpen: false,
    starterUrl: undefined,
    commentId: undefined,
    replyId: undefined,
    replyReplyId: undefined,
  },
  network: {
    isOnline: navigator.onLine,
    status: "",
    showNumber: 0,
  },
  feeds: {
    feeds: [],
    loading: true,
    page: 1,
    totalPages: 0,
    totalRows: 0,
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
        showNumber: number;
      }>
    ) => {
      state.network = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.feeds.loading = action.payload;
    },

    setFeeds: (state, action: PayloadAction<FeedResponseType>) => {
      state.feeds.totalPages = action.payload.totalPages;
      state.feeds.totalRows = action.payload.totalRows;

      state.feeds.feeds = [...state.feeds.feeds!, ...action.payload.feeds];
    },

    addFeed: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    updatePage: (state, action: PayloadAction<number>) => {
      state.feeds.page = state.feeds.page + 1;
    },

    updateTotalPagesAndRows: (
      state,
      action: PayloadAction<{ totalPages: number; totalRows: number }>
    ) => {
      state.feeds.totalPages = action.payload.totalPages;
      state.feeds.totalRows = action.payload.totalRows;
    },

    /** commentModal state */
    showCommentModal: (
      state,
      action: PayloadAction<ShowCommentModalPayload>
    ) => {
      state.commentModal.isOpen = action.payload.isOpen;
      state.commentModal.feedId = action.payload.feedId;
      state.commentModal.actionUpOn = action.payload.actionUpOn;
      state.commentModal.starterUrl = action.payload.starterUrl;
    },

    setLoadingForCommentModal: (
      state,
      action: PayloadAction<{ newLoading: boolean }>
    ) => {
      const currentFeed = state.feeds.feeds?.find((feed) => {
        return feed.id === state.commentModal.feedId;
      });
      switch (state.commentModal.actionUpOn) {
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

    setCommentsForCommentModal: (
      state,
      action: PayloadAction<SetCommentActionPayload>
    ) => {
      const currentFeed = state.feeds.feeds?.find((feed) => {
        return feed.id === state.commentModal.feedId;
      });
      switch (state.commentModal.actionUpOn) {
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

    setErrorForCommentModal: (
      state,
      action: PayloadAction<{ newError: string }>
    ) => {
      const currentFeed = state.feeds.feeds?.find((feed) => {
        return feed.id === state.commentModal.feedId;
      });
      switch (state.commentModal.actionUpOn) {
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

    /** reactionModal */

    openReactionModal: (state, action: PayloadAction<ShowReactionModal>) => {
      if (action.payload.fromWhat === "feed") {
        const currentFeed = state.feeds.feeds?.find((feed) => {
          return feed.id === state.commentModal.feedId;
        });
        if (action.payload.actionUpOn === "oUserPost") {
          if (currentFeed) {
            currentFeed.userPost.oUserPost._reactions.header.currentReactionType =
              action.payload.currentReactionType;
          }
        }

        if (action.payload.actionUpOn === "userSharePost") {
          if (currentFeed) {
            currentFeed.userPost.userSharePost._reactions.header.currentReactionType =
              action.payload.currentReactionType;
          }
        }

        if (action.payload.actionUpOn === "oPagePost") {
          if (currentFeed) {
            currentFeed.pagePost.oPagePost._reactions.header.currentReactionType =
              action.payload.currentReactionType;
          }
        }

        if (action.payload.actionUpOn === "pageSharePost") {
          if (currentFeed) {
            currentFeed.pagePost.pageSharePost._reactions.header.currentReactionType =
              action.payload.currentReactionType;
          }
        }

        if (action.payload.actionUpOn === "oGroupPost") {
          if (currentFeed) {
            currentFeed.groupPost.oGroupPost._reactions.header.currentReactionType =
              action.payload.currentReactionType;
          }
        }

        if (action.payload.actionUpOn === "toGroupSharedPost") {
          if (currentFeed) {
            currentFeed.groupPost.toGroupSharedPost._reactions.header.currentReactionType =
              action.payload.currentReactionType;
          }
        }
      }

      if (action.payload.fromWhat === "comment") {
        const currentFeed = state.feeds.feeds?.find((feed) => {
          return feed.id === state.commentModal.feedId;
        });
        if (action.payload.actionUpOn === "oUserPost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.userPost.oUserPost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "userSharePost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.userPost.userSharePost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "oPagePost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.pagePost.oPagePost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "pageSharePost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.pagePost.pageSharePost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "oGroupPost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.groupPost.oGroupPost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "toGroupSharedPost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.groupPost.toGroupSharedPost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }
      }

      if (action.payload.fromWhat === "reply") {
        const currentFeed = state.feeds.feeds?.find((feed) => {
          return feed.id === state.commentModal.feedId;
        });
        if (action.payload.actionUpOn === "oUserPost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.userPost.oUserPost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              if (currentComment.replies.replies) {
                const currentReply = currentComment.replies.replies.find(
                  (reply) => {
                    return reply.id === action.payload.replyId;
                  }
                );
                if (currentReply) {
                  currentComment._reactions.header.currentReactionType =
                    action.payload.currentReactionType;
                }
              }
            }
          }
        }

        if (action.payload.actionUpOn === "userSharePost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.userPost.userSharePost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "oPagePost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.pagePost.oPagePost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "pageSharePost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.pagePost.pageSharePost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "oGroupPost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.groupPost.oGroupPost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }

        if (action.payload.actionUpOn === "toGroupSharedPost") {
          if (currentFeed) {
            const currentComment =
              currentFeed.groupPost.toGroupSharedPost._comments.comments?.find(
                (comment) => {
                  return comment.id === action.payload.commentId;
                }
              );

            if (currentComment) {
              currentComment._reactions.header.currentReactionType =
                action.payload.currentReactionType;
            }
          }
        }
      }
      state.reactionModal.isOpen = action.payload.isOpen;
      state.reactionModal.fromWhat = action.payload.fromWhat;
      state.reactionModal.actionUpOn = action.payload.actionUpOn;
      state.reactionModal.feedId = action.payload.feedId;
      state.reactionModal.commentId = action.payload.commentId;
      state.reactionModal.replyId = action.payload.replyId;
      state.reactionModal.replyReplyId = action.payload.replyReplyId;
      state.reactionModal.actionUpOn = action.payload.actionUpOn;
    },

    setHeaderLoading: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    setHeaderGReaction: (
      state,
      action: PayloadAction<FeedsType | undefined>
    ) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    setHeaderError: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    setBodyLoading: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    setBodyReactors: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },

    setBodyError: (state, action: PayloadAction<FeedsType | undefined>) => {
      state.feeds.feeds?.unshift(action.payload!);
    },
  },
});

export const {
  setNetWorkError,
  setFeeds,
  setLoading,
  addFeed,
  updatePage,
  updateTotalPagesAndRows,
} = feedSlice.actions;

export default feedSlice.reducer;
