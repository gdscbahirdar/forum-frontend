import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "settings/state",
  initialState: {
    sideBarExpand: true,
    mobileSideBarExpand: false,
    selectedCategory: {}
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.sideBarExpand = action.payload;
    },
    toggleMobileSidebar: (state, action) => {
      state.mobileSideBarExpand = action.payload;
    },
    toggleNewMessageDialog: (state, action) => {
      state.newMessageDialog = action.payload;
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  toggleMobileSidebar,
  toggleNewMessageDialog,
  updateSelectedCategory
} = stateSlice.actions;

export default stateSlice.reducer;
