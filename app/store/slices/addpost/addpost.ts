import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetUploadedMediasToAdd } from "../../types";

interface UploadedMediaType {
  url: string;
  type: string;
}
// Define a type for the slice state
interface AddPostState {
  toShowAddPostModal: boolean;
  content: string;
  hasChoosenPhoto: boolean;
  upLoadedMedias: UploadedMediaType[];
}

// Define the initial state using that type
const initialState: AddPostState = {
  toShowAddPostModal: false,
  content: "",
  hasChoosenPhoto: false,
  upLoadedMedias: [],
};

export const addPostSlice = createSlice({
  name: "addPostSlice",
  initialState,
  reducers: {
    showAddPostModal: (state, action: PayloadAction<boolean>) => {
      state.toShowAddPostModal = action.payload;
    },

    setPostContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },

    setUploadedMediasToAdd: (
      state,
      action: PayloadAction<SetUploadedMediasToAdd>
    ) => {
      switch (action.payload.type) {
        case "add":
          state.upLoadedMedias.push(action.payload.media!);
          break;
        case "delete":
          const media = state.upLoadedMedias.find(
            (media) => media.url === action.payload.media?.url
          );
          if (media) {
            state.upLoadedMedias = state.upLoadedMedias.filter(
              (media) => media !== media
            );
          }
          break;

        case "empty":
          state.upLoadedMedias = [];

        default:
          break;
      }
    },
  },
});

export const { showAddPostModal, setPostContent, setUploadedMediasToAdd } =
  addPostSlice.actions;

export default addPostSlice.reducer;
