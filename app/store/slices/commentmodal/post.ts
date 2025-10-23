import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsUser } from "@/app/components/home/feed/types";
import { Comment_USER } from "@/app/generated/prisma";

// Define a type for the slice state
interface CommentModalState {
  user: {
    post: PostsUser;
    comments: {
      id: string;
      loading: boolean;
      page: number;
      error: string;
      data: Comment_USER[];
    }[];
  };
}

// Define the initial state using that type
const initialState: CommentModalState = {
  user: {
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
  },
});

export const { setPost } = CommentModalSlice.actions;

export default CommentModalSlice.reducer;
