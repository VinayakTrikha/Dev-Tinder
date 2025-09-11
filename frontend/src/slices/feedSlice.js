import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData(state, action) {
      return action.payload;
    },
    removeFeed: () => null,
  },
});

export const { addFeedData, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
