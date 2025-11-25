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
import { PostType } from "@/app/generated/prisma";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CommentsShownType = {
  id?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  totalRows?: number;
  totalPages?: number;
  comments?: CommentType;
  replies?: RepliesShownType[];
};

type RepliesShownType = {
  commentid?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  totalRows?: number;
  totalPages?: number;
  replies?: ReplyType;
  replyReplies?: ReplyRepliesShownType[];
};

type ReplyRepliesShownType = {
  replyId?: string;
  loading?: boolean;
  page?: number;
  error?: string;
  totalRows?: number;
  totalPages?: number;
  replies?: ReplyType;
};
type ShowModalPayLoadType = {
  isOpen: boolean;
  id?: string | undefined;
  starterUrl?: string;
  currentPost?: {
    postType: PostType | undefined;
    oUserPost?: OUserPost;
    userSharePost?: UserSharePost;
    oPagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    oGroupPost?: OGroupPost;
    toGroupSharedPost?: ToGroupSharedPost;
  };
};
// Define a type for the slice state
interface CommentModalState {
  isOpen: boolean;
  id: string | undefined;
  commentId: string | undefined;
  replyId: string | undefined;
  currentPost: {
    postType: PostType | undefined;
    oUserPost?: OUserPost;
    userSharePost?: UserSharePost;
    oPagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    oGroupPost?: OGroupPost;
    toGroupSharedPost?: ToGroupSharedPost;
  };

  commentsShown: CommentsShownType[];
  starterUrl: string | undefined;
}

// Define the initial state using that type
const initialState: CommentModalState = {
  isOpen: false,
  currentPost: {
    postType: undefined,
  },
  id: undefined,
  commentId: undefined,
  replyId: undefined,
  commentsShown: [],
  starterUrl: undefined,
};

export const commentModalSlice = createSlice({
  name: "commentModalSlice",
  initialState,
  reducers: {
    showCommentModal: (state, action: PayloadAction<ShowModalPayLoadType>) => {
      state.isOpen = action.payload.isOpen;

      state.id = action.payload.id;
      state.starterUrl = action.payload.starterUrl;

      if (action.payload.currentPost) {
        state.currentPost.postType = action.payload.currentPost.postType;

        if (action.payload.currentPost.postType === "oUserPost") {
          state.currentPost.oUserPost = action.payload.currentPost.oUserPost;
        }

        if (action.payload.currentPost.postType === "userSharePost") {
          state.currentPost.userSharePost =
            action.payload.currentPost.userSharePost;
        }
        if (action.payload.currentPost.postType === "oPagePost") {
          state.currentPost.oPagePost = action.payload.currentPost.oPagePost;
        }
        if (action.payload.currentPost.postType === "pageSharePost") {
          state.currentPost.pageSharePost =
            action.payload.currentPost.pageSharePost;
        }
        if (action.payload.currentPost.postType === "oGroupPost") {
          state.currentPost.oGroupPost = action.payload.currentPost.oGroupPost;
        }
        if (action.payload.currentPost.postType === "toGroupSharedPost") {
          state.currentPost.toGroupSharedPost =
            action.payload.currentPost.toGroupSharedPost;
        }
      }

      const isShown = state.commentsShown.find((cs) => {
        return cs.id === action.payload.id;
      });

      if (!isShown) {
        state.commentsShown.push({
          id: action.payload.id,
          loading: true,
          page: 1, // for the first time,
          error: undefined,
          totalPages: 0,
          totalRows: 0,
          comments: [],
          replies: [],
        });
      }
    },

    fetchingComments: (state, action: PayloadAction<boolean>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      currentShownComment!.loading = action.payload;
    },

    commentsFetched: (
      state,
      action: PayloadAction<{ result: CommentsResponseType }>
    ) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      if (currentShownComment!.comments && action.payload.result.comments) {
        currentShownComment!.comments = [
          ...currentShownComment!.comments,
          ...action.payload.result.comments,
        ];
        currentShownComment!.totalPages = action.payload.result.totalPages;
        currentShownComment!.totalRows = action.payload.result.totalRows;
      }
    },
    fetchingCommentsFaild: (state, action: PayloadAction<string>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      currentShownComment!.error = action.payload;
    },

    updateCommentsPage: (state, action: PayloadAction<number>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });
      currentShownComment!.page = action.payload;
    },

    fetchingReplies: (
      state,
      action: PayloadAction<{ newLoading: boolean; commentId: string }>
    ) => {
      state.commentId = action.payload.commentId;
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === action.payload.commentId;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === action.payload.commentId;
      });

      if (!currentShownReply) {
        currentShownComment!.replies?.push({
          commentid: action.payload.commentId,
          loading: false,
          error: undefined,
          page: 1,
          replies: [],
          totalPages: 0,
          totalRows: 0,
          replyReplies: [],
        });
      } else {
        currentShownReply!.loading = action.payload.newLoading;
      }
    },

    repliesFetched: (state, action: PayloadAction<{ replies: ReplyType }>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      currentShownReply!.replies = action.payload.replies;
    },

    fetchingRepliesFailed: (state, action: PayloadAction<string>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      currentShownReply!.error = action.payload;
    },

    updateRepliesPage: (state, action: PayloadAction<number>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      currentShownReply!.page = action.payload;
    },

    fetchingReplyReplies: (
      state,
      action: PayloadAction<{ replyId: string; newLoading: boolean }>
    ) => {
      state.replyId = action.payload.replyId;
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      const currentShownReplyReply = currentShownReply!.replyReplies?.find(
        (rep) => {
          return rep.replyId === action.payload.replyId;
        }
      );
      if (!currentShownReplyReply) {
        currentShownReply!.replyReplies?.push({
          replyId: action.payload.replyId,
          loading: false,
          error: undefined,
          page: 1,
          replies: [],
          totalPages: 0,
          totalRows: 0,
        });
      } else {
        currentShownReplyReply!.loading = action.payload.newLoading;
      }
    },

    replyRepliesFetched: (
      state,
      action: PayloadAction<{ replies: ReplyType }>
    ) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      const currentShownReplyReply = currentShownReply?.replyReplies?.find(
        (rep) => {
          return rep.replyId === state.replyId;
        }
      );
      currentShownReplyReply!.replies = action.payload.replies;
    },

    fetchingReplyRepliesFailed: (state, action: PayloadAction<string>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      const currentShownReplyReply = currentShownReply?.replyReplies?.find(
        (rep) => {
          return rep.replyId === state.replyId;
        }
      );
      currentShownReplyReply!.error = action.payload;
    },

    updateReplyRepliesPage: (state, action: PayloadAction<number>) => {
      const currentShownComment = state.commentsShown.find((cs) => {
        return cs.id === state.id;
      });

      const currentShownReply = currentShownComment!.replies?.find((rep) => {
        return rep.commentid === state.commentId;
      });

      const currentShownReplyReply = currentShownReply?.replyReplies?.find(
        (rep) => {
          return rep.replyId === state.replyId;
        }
      );
      currentShownReplyReply!.page = action.payload;
    },
  },
});

export const {
  showCommentModal,
  fetchingComments,
  commentsFetched,
  fetchingCommentsFaild,
  updateCommentsPage,
  fetchingReplies,
  repliesFetched,
  fetchingRepliesFailed,
  updateRepliesPage,
  fetchingReplyReplies,
  replyRepliesFetched,
  fetchingReplyRepliesFailed,
  updateReplyRepliesPage,
} = commentModalSlice.actions;

export default commentModalSlice.reducer;
