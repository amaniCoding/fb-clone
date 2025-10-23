import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsUser } from "@/app/components/home/feed/types";
import { Comment_USER, PostType, Prisma } from "@/app/generated/prisma";

// Define a type for the slice state
interface ExtendedComment extends Comment_USER {
  grouped_reactions: (Prisma.PickEnumerable<
    Prisma.CommentReactions_USERGroupByOutputType,
    "reactionType"
  > & {
    _count: {
      reactionType: number;
    };
  })[];
  _count: {
    reactions: number;
    replies: number;
  };
  user: {
    firstName: string;
    lastName: string;
    Profile: {
      profilePicture: string | null;
    } | null;
  };
}
interface Comment {
  postId: string;
  loading: boolean;
  page: number;
  error: string;
  data: ExtendedComment[];
}

interface CommentModalState {
  user: {
    totalRows: number;
    totalPages: number;
    post: PostsUser;
    comments: {
      postId: string;
      loading: boolean;
      page: number;
      error: string;
      data: ExtendedComment[];
    }[];
  };
}

// Define the initial state using that type
const initialState: CommentModalState = {
  user: {
    totalPages: 0,
    totalRows: 0,
    post: {
      _count: {
        comments: 0,
        reactions: 0,
      },

      audience: "friends",
      content: "",
      createdAt: new Date(),
      doing: "",
      doingWhat: "",
      id: "",
      location: "",
      medias: [],
      postType: "userpost",
      sAudience: "customList",
      reactions_grouped: [],
      updatedAt: new Date(),
      user: {
        firstName: "",
        lastName: "",
        Profile: {
          profilePicture: "",
        },
      },
      reactions: [],
      userId: "",
    },
    comments: [],
  },
};

export const CommentModalSlice = createSlice({
  name: "CommentModalSlice",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostsUser>) => {
      switch (action.payload.postType) {
        case "userpost":
          state.user.post = action.payload;
          break;

        default:
          break;
      }
    },

    setPage: (
      state,
      action: PayloadAction<{
        page: number;
        postType: PostType;
        postId: string;
      }>
    ) => {
      switch (action.payload.postType) {
        case "userpost":
          const comment = state.user.comments.find((comment) => comment.postId);
          if (comment) {
            comment.page = action.payload.page;
          } else {
            const newComment: Comment = {
              data: [],
              error: "",
              loading: false,
              page: 1,
              postId: action.payload.postId,
            };
            state.user.comments.push(newComment);
          }
          break;

        default:
          break;
      }
    },

    setComments: (
      state,
      action: PayloadAction<{
        postType: PostType;
        postId: string;
        comments: ExtendedComment[];
      }>
    ) => {
      switch (action.payload.postType) {
        case "userpost":
          const comment = state.user.comments.find((comment) => comment.postId);
          if (comment) {
            comment.data = action.payload.comments;
          } else {
            const newComment: Comment = {
              data: [],
              error: "",
              loading: false,
              page: 1,
              postId: action.payload.postId,
            };
            state.user.comments.push(newComment);
          }
          break;

        default:
          break;
      }
    },

    setLoading: (
      state,
      action: PayloadAction<{
        loading: boolean;
        postType: PostType;
        postId: string;
      }>
    ) => {
      switch (action.payload.postType) {
        case "userpost":
          const comment = state.user.comments.find((comment) => comment.postId);
          if (comment) {
            comment.loading = action.payload.loading;
          } else {
            const newComment: Comment = {
              data: [],
              error: "",
              loading: false,
              page: 1,
              postId: action.payload.postId,
            };
            state.user.comments.push(newComment);
          }
          break;

        default:
          break;
      }
    },

    setError: (
      state,
      action: PayloadAction<{
        error: string;
        postType: PostType;
        postId: string;
      }>
    ) => {
      switch (action.payload.postType) {
        case "userpost":
          const comment = state.user.comments.find((comment) => comment.postId);
          if (comment) {
            comment.error = action.payload.error;
          } else {
            const newComment: Comment = {
              data: [],
              error: "",
              loading: false,
              page: 1,
              postId: action.payload.postId,
            };
            state.user.comments.push(newComment);
          }
          break;

        default:
          break;
      }
    },
  },
});

export const { setPost, setPage, setLoading, setError, setComments } =
  CommentModalSlice.actions;

export default CommentModalSlice.reducer;
