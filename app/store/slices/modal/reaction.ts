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
  currentPost?: {
    postType: PostType;
    post:
      | OUserPost
      | UserSharePost
      | OPagePost
      | PageSharePost
      | OGroupPost
      | ToGroupSharedPost;
  };
  currentReactionType?: ReactionType;
};
interface ReactionModalState {
  isOpen: boolean;
  currentReactionType: ReactionType | undefined;
  currentPost?: {
    postType: PostType;
    post:
      | OUserPost
      | UserSharePost
      | OPagePost
      | PageSharePost
      | OGroupPost
      | ToGroupSharedPost;
  };
}

// Define the initial state using that type
const initialState: ReactionModalState = {
  isOpen: false,
  currentReactionType: undefined,
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
      state.currentPost = {
        post: action.payload.currentPost!.post,
        postType: action.payload.currentPost!.postType,
      };
    },
    udpateCurrentReactionType: (state, action: PayloadAction<ReactionType>) => {
      state.currentReactionType = action.payload;
    },
  },
});

export const { showReactionModal, udpateCurrentReactionType } =
  reactionModalSlice.actions;

export default reactionModalSlice.reducer;
