import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "resourcesDetail/state",
  initialState: {
    deleteConfirmation: false,
    selectedResource: ""
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedResource: (state, action) => {
      state.selectedResource = action.payload;
    }
  }
});

export const { toggleDeleteConfirmation, setSelectedResource } =
  stateSlice.actions;

export default stateSlice.reducer;
