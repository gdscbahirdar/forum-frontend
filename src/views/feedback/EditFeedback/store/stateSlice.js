import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "feedback/state",
  initialState: {
    mode: "edit"
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    }
  }
});

export const { setMode } = stateSlice.actions;

export default stateSlice.reducer;
