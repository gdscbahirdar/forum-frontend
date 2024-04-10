import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "facultyAdminDetails/state",
  initialState: {
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editFacultyAdminDetailDialog: false,
    selectedCard: {}
  },
  reducers: {
    openDeletePaymentMethodDialog: state => {
      state.deletePaymentMethodDialog = true;
    },
    closeDeletePaymentMethodDialog: state => {
      state.deletePaymentMethodDialog = false;
    },
    openEditPaymentMethodDialog: state => {
      state.editPaymentMethodDialog = true;
    },
    closeEditPaymentMethodDialog: state => {
      state.editPaymentMethodDialog = false;
    },
    openEditFacultyAdminDetailDialog: state => {
      state.editFacultyAdminDetailDialog = true;
    },
    closeEditFacultyAdminDetailDialog: state => {
      state.editFacultyAdminDetailDialog = false;
    },
    updateSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    }
  }
});

export const {
  openDeletePaymentMethodDialog,
  closeDeletePaymentMethodDialog,
  openEditPaymentMethodDialog,
  closeEditPaymentMethodDialog,
  openEditFacultyAdminDetailDialog,
  closeEditFacultyAdminDetailDialog,
  updateSelectedCard
} = stateSlice.actions;

export default stateSlice.reducer;
