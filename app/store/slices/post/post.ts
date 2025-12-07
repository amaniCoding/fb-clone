import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PostState {
  toShowCommentModal: boolean;
}

// Define the initial state using that type
const initialState: PostState = {
  toShowCommentModal: false,
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    showCommentModal: (state, action: PayloadAction<boolean>) => {
      state.toShowCommentModal = action.payload;
    },
  },
});

export const { showCommentModal } = postSlice.actions;

export default postSlice.reducer;
