import { CommentType } from "@/app/apis/comments/oUserPost/[postid]/[page]/lib";
import { CommentsResponseType } from "@/app/apis/comments/oUserPost/[postid]/[page]/route";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  ToGroupSharedPost,
  UserSharePost,
  PageSharePost,
} from "@/app/apis/feeder/[page]/lib";
import { ReplyType } from "@/app/apis/replies/oUserPost/[postid]/[commentid]/[page]/lib";
import { ReplyResponseType } from "@/app/apis/replies/oUserPost/[postid]/[commentid]/[page]/route";
import { ReplyReplysType } from "@/app/apis/replyreplies/oUserPost/[postid]/[commentid]/[replyid]/[page]/lib";
import { ReplyRepliesResponseType } from "@/app/apis/replyreplies/oUserPost/[postid]/[commentid]/[replyid]/[page]/route";
import { PostType } from "@/app/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CommentsShownType = {
  refId?: string;

  loading?: boolean;
  page?: number;
  error?: string;
  hasError?: boolean;
  totalRows?: number;
  totalPages?: number;
  comments?: CommentType;
};

type PostsShownType = {
  refId?: string;

  loading?: boolean;
  error?: string;
  hasError?: boolean;
  postType?: PostType;
  post?: {
    oUserPost?: OUserPost;
    userSharePost?: UserSharePost;
    oPagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    oGroupPost?: OGroupPost;
    toGroupSharedPost?: ToGroupSharedPost;
  };
};

type RepliesShownType = {
  refId?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  hasError?: boolean;
  totalRows?: number;
  totalPages?: number;
  replies?: ReplyType;
};

type ReplyRepliesShownType = {
  refId?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  hasError?: boolean;
  totalRows?: number;
  totalPages?: number;
  replies?: ReplyReplysType;
};

type ShowModalPayLoadType = {
  isOpen: boolean;
  currentParentRefId?: string;
  commentstarterUrl?: string;
  postStarterUrl?: string;
  loading?: boolean;
  postType?: PostType;
};

export type FetchingPostSucceedType = {
  postType: PostType;
  oUserPost?: OUserPost;
  userSharePost?: UserSharePost;
  oPagePost?: OPagePost;
  pageSharePost?: PageSharePost;
  toGroupSharedPost?: ToGroupSharedPost;
  oGroupPost?: OGroupPost;
};
// Define a type for the slice state
interface CommentModalState {
  isOpen: boolean;
  currentParentRefId?: string;
  currentPostRef?: {
    refId?: string;
    starterUrl?: string;
    postType?: PostType;
    postsShown?: PostsShownType[];
  };
  currentCommentRef?: {
    refId?: string;
    commentsShown?: CommentsShownType[];
    starterUrl?: string;
  };
  currentReplyRef?: {
    refId?: string;
    repliesShown?: RepliesShownType[];
    starterUrl?: string;
  };
  currentReplyReplyRef?: {
    refId?: string;
    replyRepliesShown?: ReplyRepliesShownType[];
    starterUrl?: string;
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
      state.currentParentRefId = action.payload.currentParentRefId;
      if (!state.currentCommentRef) {
        state.currentCommentRef = {
          starterUrl: action.payload.commentstarterUrl,
          refId: action.payload.currentParentRefId,
        };
      }
      if (!state.currentPostRef) {
        state.currentPostRef = {
          refId: action.payload.currentParentRefId,
          postType: action.payload.postType,
          starterUrl: action.payload.postStarterUrl,
        };
      }
    },

    fetchingPost: (state, action: PayloadAction<boolean>) => {
      if (!state.currentPostRef!.postsShown) {
        state.currentPostRef!.postsShown = [
          {
            loading: action.payload,
          },
        ];
      } else {
        const isShown = state.currentPostRef!.postsShown!.find((ps) => {
          return ps.refId === state.currentParentRefId;
        });
        isShown!.loading = action.payload;
      }
    },

    fetchingPostSucceed: (
      state,
      action: PayloadAction<FetchingPostSucceedType | undefined>
    ) => {
      const isShown = state.currentPostRef!.postsShown!.find((ps) => {
        return ps.refId === state.currentParentRefId;
      });
      isShown!.postType = action.payload!.postType;
      if (action.payload!.postType === "oUserPost") {
        isShown!.post = {
          oUserPost: action.payload!.oUserPost,
        };
        return;
      }
      if (action.payload!.postType === "userSharePost") {
        isShown!.post = {
          userSharePost: action.payload!.userSharePost,
        };
        return;
      }
      if (action.payload!.postType === "oPagePost") {
        isShown!.post = {
          oPagePost: action.payload!.oPagePost,
        };
        return;
      }
      if (action.payload!.postType === "pageSharePost") {
        isShown!.post = {
          pageSharePost: action.payload!.pageSharePost,
        };
        return;
      }
      if (action.payload!.postType === "oGroupPost") {
        isShown!.post = {
          oGroupPost: action.payload!.oGroupPost,
        };
        return;
      }
      if (action.payload!.postType === "toGroupSharedPost") {
        isShown!.post = {
          toGroupSharedPost: action.payload!.toGroupSharedPost,
        };
        return;
      }
    },

    fetchingPostFaild: (
      state,
      action: PayloadAction<{ hasError: boolean; error?: string }>
    ) => {
      const isShown = state.currentPostRef!.postsShown!.find((ps) => {
        return ps.refId === state.currentParentRefId;
      });
      if (action.payload.hasError) {
        isShown!.hasError = action.payload.hasError;
        isShown!.error = action.payload.error;
      }
    },

    fetchingComments: (state, action: PayloadAction<boolean>) => {
      if (!state.currentCommentRef!.commentsShown) {
        state.currentCommentRef!.commentsShown = [
          {
            loading: action.payload,
          },
        ];
      } else {
        const isShown = state.currentCommentRef!.commentsShown!.find((cs) => {
          return cs.refId === state.currentCommentRef!.refId;
        });
        isShown!.loading = true;
        isShown!.comments = [];
      }

      // now currentCommentRef is defiend now
    },

    commentsFetched: (
      state,
      action: PayloadAction<{ result: CommentsResponseType }>
    ) => {
      const isShown = state.currentCommentRef!.commentsShown!.find((cs) => {
        return cs.refId === state.currentCommentRef!.refId;
      });

      if (action.payload.result.comments) {
        isShown!.comments = [
          ...isShown!.comments!,
          ...action.payload.result.comments,
        ];
      }
      isShown!.totalPages = action.payload.result.totalPages;
      isShown!.totalRows = action.payload.result.totalRows;
    },
    fetchingCommentsFaild: (
      state,
      action: PayloadAction<{ hasError: boolean; error?: string }>
    ) => {
      const isShown = state.currentCommentRef!.commentsShown!.find((cs) => {
        return cs.refId === state.currentCommentRef!.refId;
      });
      if (action.payload.hasError) {
        isShown!.error = action.payload.error;
        isShown!.hasError = action.payload.hasError;
      }
    },

    updatePageForComments: (state, action: PayloadAction<number>) => {
      const isShown = state.currentCommentRef!.commentsShown!.find((cs) => {
        return cs.refId === state.currentCommentRef!.refId;
      });
      isShown!.page = action.payload;
    },

    fetchingReplies: (
      state,
      action: PayloadAction<{ loading: boolean; commentId?: string }>
    ) => {
      const newRefId = `${state.currentCommentRef!.refId}${
        action.payload.commentId
      }`;
      if (!state.currentReplyRef) {
        state.currentReplyRef = {
          refId: newRefId,
        };
      } else {
        if (!state.currentReplyRef.repliesShown) {
          state.currentReplyRef.repliesShown = [
            {
              loading: action.payload.loading,
              replies: [],
            },
          ];
        } else {
          const isShown = state.currentReplyRef!.repliesShown!.find((rs) => {
            return rs.refId === newRefId;
          });
          isShown!.loading = action.payload.loading;
        }
      }
    },

    repliesFetched: (
      state,
      action: PayloadAction<{ result: ReplyResponseType }>
    ) => {
      const isShown = state.currentReplyRef!.repliesShown!.find((rs) => {
        return rs.refId === state.currentReplyRef!.refId;
      });
      if (action.payload.result.replies && isShown!.replies) {
        isShown!.replies = [
          ...isShown!.replies,
          ...action.payload.result.replies,
        ];
      }
    },

    fetchingRepliesFailed: (
      state,
      action: PayloadAction<{ hasError: boolean; error: string }>
    ) => {
      const isShown = state.currentReplyRef!.repliesShown!.find((rs) => {
        return rs.refId === state.currentReplyRef!.refId;
      });
      if (action.payload.hasError) {
        isShown!.hasError = action.payload.hasError;
        isShown!.error = action.payload.error;
      }
    },

    updatePageForReplies: (state, action: PayloadAction<number>) => {
      const isShown = state.currentReplyRef!.repliesShown!.find((rs) => {
        return rs.refId === state.currentReplyRef!.refId;
      });
      isShown!.page = action.payload;
    },

    fetchingReplyReplies: (
      state,
      action: PayloadAction<{ replyId?: string; loading: boolean }>
    ) => {
      const newRefId = `${state.currentReplyRef!.refId}${
        action.payload.replyId
      }`;
      if (!state.currentReplyReplyRef) {
        state.currentReplyReplyRef = {
          refId: newRefId,
          replyRepliesShown: [],
        };
      } else {
        const isShown = state.currentReplyReplyRef!.replyRepliesShown!.find(
          (rrs) => {
            return rrs.refId === newRefId;
          }
        );
        isShown!.loading = action.payload.loading;
      }
    },

    replyRepliesFetched: (
      state,
      action: PayloadAction<ReplyRepliesResponseType>
    ) => {
      const isShown = state.currentReplyReplyRef!.replyRepliesShown!.find(
        (rrs) => {
          return rrs.refId === state.currentReplyReplyRef!.refId;
        }
      );
      if (action.payload.replies && isShown!.replies) {
        isShown!.replies = [...isShown!.replies, ...action.payload.replies];
      }
    },

    fetchingReplyRepliesFailed: (
      state,
      action: PayloadAction<{ hasError: boolean; error: string }>
    ) => {
      const isShown = state.currentReplyReplyRef!.replyRepliesShown!.find(
        (rrs) => {
          return rrs.refId === state.currentReplyReplyRef!.refId;
        }
      );
      if (action.payload.hasError) {
        isShown!.hasError = action.payload.hasError;
        isShown!.error = action.payload.error;
      }
    },

    updatePageForReplyReplies: (state, action: PayloadAction<number>) => {
      const isShown = state.currentReplyReplyRef!.replyRepliesShown!.find(
        (rrs) => {
          return rrs.refId === state.currentReplyReplyRef!.refId;
        }
      );
      isShown!.page = action.payload;
    },
  },
});

export const {
  showCommentModal,
  fetchingComments,
  commentsFetched,
  fetchingCommentsFaild,
  updatePageForComments,
  fetchingReplies,
  repliesFetched,
  fetchingRepliesFailed,
  updatePageForReplies,
  fetchingReplyReplies,
  replyRepliesFetched,
  fetchingReplyRepliesFailed,
  updatePageForReplyReplies,
  fetchingPost,
  fetchingPostSucceed,
  fetchingPostFaild,
} = commentModalSlice.actions;

export default commentModalSlice.reducer;
