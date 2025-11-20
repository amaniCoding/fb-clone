import { FeedsType } from "@/app/apis/feeder/[page]/lib";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FeedState {
  network: {
    isOnline: boolean;
    status: string;
    showNumber: number;
  };
}

const initialState: FeedState = {
  network: {
    isOnline: navigator.onLine,
    status: "",
    showNumber: 0,
  },
};

export const appSlice = createSlice({
  name: "appSlice",
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
  },
});

export const { setNetWorkError } = appSlice.actions;

export default appSlice.reducer;
