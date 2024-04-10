import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "faculty_admins/state",
  initialState: {
    drawerOpen: false,
    selectedFacultyAdmin: {},
    sortedColumn: () => {},
    newFacultyAdminDialog: false
  },
  reducers: {
    setSelectedFacultyAdmin: (state, action) => {
      state.selectedFacultyAdmin = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setDrawerOpen: state => {
      state.drawerOpen = true;
    },
    setDrawerClose: state => {
      state.drawerOpen = false;
    },
    toggleNewFacultyAdminDialog: (state, action) => {
      state.newFacultyAdminDialog = action.payload;
    }
  }
});

export const {
  setSelectedFacultyAdmin,
  setDrawerOpen,
  setDrawerClose,
  setSortedColumn,
  toggleNewFacultyAdminDialog
} = stateSlice.actions;

export default stateSlice.reducer;
