import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "resources/state",
  initialState: {
    deleteConfirmation: false,
    selectedResource: "",
    sortedColumn: () => {}
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setSelectedResource: (state, action) => {
      state.selectedResource = action.payload;
    }
  }
});

export const {
  toggleDeleteConfirmation,
  setSortedColumn,
  setSelectedResource
} = stateSlice.actions;

export default stateSlice.reducer;
