import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetUploadedMediasToAdd } from "../types";

interface UploadedMediaType {
  url: string;
  type: string;
}
// Define a type for the slice state
interface FeedState {
  currentPostAction: {
    toShowCommentModal: boolean;
  };
  addPost: {
    toShowAddPostModal: boolean;
    post: string;
    hasChoosenPhoto: boolean;
    upLoadedMedias: UploadedMediaType[];
  };
  network: {
    isOnline: boolean;
    status: string;
  };
}

// Define the initial state using that type
const initialState: FeedState = {
  network: {
    isOnline: false,
    status: "",
  },
  currentPostAction: {
    toShowCommentModal: false,
  },
  addPost: {
    toShowAddPostModal: false,
    post: "",
    hasChoosenPhoto: false,
    upLoadedMedias: [],
  },
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    showCommentModal: (state, action: PayloadAction<boolean>) => {
      state.currentPostAction.toShowCommentModal = action.payload;
    },
    showAddPostModal: (state, action: PayloadAction<boolean>) => {
      state.addPost.toShowAddPostModal = action.payload;
    },

    setPostToAdd: (state, action: PayloadAction<string>) => {
      state.addPost.post = action.payload;
    },

    setNetWorkError: (
      state,
      action: PayloadAction<{ isOnline: boolean; status: string }>
    ) => {
      state.network = action.payload;
    },
    setUploadedMediasToAdd: (
      state,
      action: PayloadAction<SetUploadedMediasToAdd>
    ) => {
      switch (action.payload.type) {
        case "add":
          state.addPost.upLoadedMedias.push(action.payload.media!);
          break;
        case "delete":
          const media = state.addPost.upLoadedMedias.find(
            (media) => media.url === action.payload.media?.url
          );
          if (media) {
            state.addPost.upLoadedMedias = state.addPost.upLoadedMedias.filter(
              (media) => media !== media
            );
          }
          break;

        case "empty":
          state.addPost.upLoadedMedias = [];

        default:
          break;
      }
    },
  },
});

export const {
  showCommentModal,
  showAddPostModal,
  setPostToAdd,
  setUploadedMediasToAdd,
  setNetWorkError,
} = feedSlice.actions;

export default feedSlice.reducer;
