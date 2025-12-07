import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  ToGroupSharedPost,
  UserSharePost,
  PageSharePost,
} from "@/app/api/feeder/[page]/lib";
import { ReactionType, PostType } from "@/app/generated/prisma/client";
type ShowReactionModalPayLoadType = {
  isOpen: boolean;
  currentPost: {
    postType?: PostType;
    oUserPost?: OUserPost;
    userSharePost?: UserSharePost;
    oPagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    toGroupSharedPost?: ToGroupSharedPost;
    oGroupPost?: OGroupPost;
  };
  currentReactionType?: ReactionType;
};
interface ReactionModalState {
  isOpen: boolean;
  currentReactionType: ReactionType | undefined;
  currentPost: {
    postType?: PostType;
    userPost?: OUserPost;
    userSharePost?: UserSharePost;
    pagePost?: OPagePost;
    pageSharePost?: PageSharePost;
    groupPost?: OGroupPost;
    groupSharePost?: ToGroupSharedPost;
  };
}

// Define the initial state using that type
const initialState: ReactionModalState = {
  isOpen: false,
  currentReactionType: undefined,
  currentPost: {},
};

export const reactionModalSlice = createSlice({
  name: "reactionModalSlice",
  initialState,
  reducers: {
    showReactionModal: (
      state,
      action: PayloadAction<ShowReactionModalPayLoadType>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.currentReactionType = action.payload.currentReactionType;
      if (action.payload.currentPost.postType === "oUserPost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          userPost: action.payload.currentPost.oUserPost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "userSharePost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          userSharePost: action.payload.currentPost.userSharePost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "oPagePost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          pagePost: action.payload.currentPost.oPagePost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "pageSharePost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          pageSharePost: action.payload.currentPost.pageSharePost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "oGroupPost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          groupPost: action.payload.currentPost.oGroupPost,
        };
        return;
      }
      if (action.payload.currentPost.postType === "toGroupSharedPost") {
        state.currentPost = {
          postType: action.payload.currentPost.postType,
          groupSharePost: action.payload.currentPost.toGroupSharedPost,
        };
        return;
      }
    },
    udpateCurrentReactionType: (state, action: PayloadAction<ReactionType>) => {
      state.currentReactionType = action.payload;
    },
  },
});

export const { showReactionModal, udpateCurrentReactionType } =
  reactionModalSlice.actions;

export default reactionModalSlice.reducer;
