import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "students/state",
  initialState: {
    drawerOpen: false,
    selectedStudent: {},
    sortedColumn: () => {},
    newStudentDialog: false,
    studentsUpload: false
  },
  reducers: {
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
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
    toggleNewStudentDialog: (state, action) => {
      state.newStudentDialog = action.payload;
    },
    toggleStudentsUpload: (state, action) => {
      state.studentsUpload = action.payload;
    }
  }
});

export const {
  setSelectedStudent,
  setDrawerOpen,
  setDrawerClose,
  setSortedColumn,
  toggleNewStudentDialog,
  toggleStudentsUpload
} = stateSlice.actions;

export default stateSlice.reducer;
