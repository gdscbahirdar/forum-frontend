import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "teachers/state",
  initialState: {
    drawerOpen: false,
    selectedTeacher: {},
    sortedColumn: () => {},
    newTeacherDialog: false
  },
  reducers: {
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
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
    toggleNewTeacherDialog: (state, action) => {
      state.newTeacherDialog = action.payload;
    }
  }
});

export const {
  setSelectedTeacher,
  setDrawerOpen,
  setDrawerClose,
  setSortedColumn,
  toggleNewTeacherDialog
} = stateSlice.actions;

export default stateSlice.reducer;
