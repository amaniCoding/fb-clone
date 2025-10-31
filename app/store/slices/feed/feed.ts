import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "@/app/apis/feeditem/comments/[posttype]/[postid]/[page]/lib";
import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/feeder/[page]/types";

interface UploadedMediaType {
  url: string;
  type: string;
}

export type feedResponseType = {
  loading: boolean;
  error: string;
  page: number;
  feeds: FeedsType[];
  totalRows: number;
  totalPages: number;
};
// Define a type for the slice state
interface FeedState {
  commentModal: {
    id: string | undefined,
    isOpen: boolean;
  };

  reactionModal: {
    isOpen: boolean,
    feedId: string | undefined,
    commentId: string | undefined,
    replyId: string | undefined,
    replyReplyId: string | undefined
    fromWhat: "feed" | "comment" | "reply" | "replyreply" | undefined;
    refs: {
      header: {
        currentReactionType: string | undefined,
        loading: boolean | undefined,
        gReactions: ReactionModalHeader[] | undefined
      },

      reactors: ReactionModalReactors[] | undefined
    }
  },
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
    id: undefined,
    isOpen: false,
  },
  reactionModal: {
    feedId: undefined,
    commentId: undefined,
    replyId: undefined,
    replyReplyId: undefined,
    fromWhat: undefined,
    isOpen: false,
    refs: {
      header: {
        currentReactionType: undefined,
        gReactions: [],
        loading: false
      },
      reactors: []
    }
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

    setFeeds: (
      state,
      action: PayloadAction<{ firstTime: boolean; result: feedResponseType }>
    ) => {
      if (!action.payload.firstTime) {
        state.feeds.feeds = [
          ...state.feeds.feeds!,
          ...action.payload.result.feeds,
        ];
      } else {
        state.feeds = action.payload.result;
      }
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

    /** comment modal */

    openCommentModal: (
      state,
      action: PayloadAction<{ isOpen: boolean; id: string }>
    ) => {
      state.commentModal.isOpen = action.payload.isOpen;
      state.commentModal.id = action.payload.id;
    },

    setPage_Comment: (
      state,
      action: PayloadAction<{
        postType: string | undefined;
        postId: string | undefined;
        newPage: number;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) =>
          feed.id === action.payload.postId &&
          feed.postType === action.payload.postType
      );
      if (currentFeed) {
        currentFeed._comments.page = action.payload.newPage;
      }
    },

    setLoading_Comment: (
      state,
      action: PayloadAction<{
        postType: string | undefined;
        postId: string | undefined;
        newLoading: boolean;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) =>
          feed.id === action.payload.postId &&
          feed.postType === action.payload.postType
      );
      if (currentFeed) {
        currentFeed._comments.loading = action.payload.newLoading;
      }
    },

    setError_Comment: (
      state,
      action: PayloadAction<{
        postType: string | undefined;
        postId: string | undefined;
        newError: string;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) =>
          feed.id === action.payload.postId &&
          feed.postType === action.payload.postType
      );
      if (currentFeed) {
        currentFeed._comments.error = action.payload.newError;
      }
    },

    setComment_Comment: (
      state,
      action: PayloadAction<{
        postType: string | undefined;
        postId: string | undefined;
        newComments: Comment;
      }>
    ) => {
      const currentFeed = state.feeds.feeds?.find(
        (feed) =>
          feed.id === action.payload.postId &&
          feed.postType === action.payload.postType
      );
      if (currentFeed) {
        currentFeed._comments.commentors = [
          ...currentFeed._comments.commentors!,
          ...action.payload.newComments!,
        ];
      }
    },

    openReactionModal: (state, action: PayloadAction<{
      isOpen: boolean,
      feedId: string,
      commentId: string | undefined,
      replyId: string | undefined,
      replyReplyId: string | undefined,
      currentReactionType: undefined,
      fromWhat: "feed" | "comment" | "reply" | "replyreply";
    }>) => {
      state.reactionModal.isOpen = action.payload.isOpen;
      state.reactionModal.fromWhat = action.payload.fromWhat;
      state.reactionModal.feedId = action.payload.feedId;
      state.reactionModal.commentId = action.payload.commentId,
      state.reactionModal.replyId = action.payload.replyId,
      state.reactionModal.replyReplyId = action.payload.replyReplyId;
      const currentFeed = state.feeds.feeds?.find(feed => feed.id === action.payload.feedId);
      if(currentFeed) {
        currentFeed.reactions.modal.
      }
    },
setLoadingFromHeader: (state, action: PayloadAction<boolean>) => {
      const currentFeed = state.feeds.feeds?.find(feed => feed.)
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

  /** commentmodal */
  openCommentModal,
  setPage_Comment,
  setLoading_Comment,
  setError_Comment,
  setComment_Comment,
} = feedSlice.actions;

export default feedSlice.reducer;
