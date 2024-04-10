import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "studentStudentDetails/state",
  initialState: {
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editStudentDetailDialog: false,
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
    openEditStudentDetailDialog: state => {
      state.editStudentDetailDialog = true;
    },
    closeEditStudentDetailDialog: state => {
      state.editStudentDetailDialog = false;
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
  openEditStudentDetailDialog,
  closeEditStudentDetailDialog,
  updateSelectedCard
} = stateSlice.actions;

export default stateSlice.reducer;
