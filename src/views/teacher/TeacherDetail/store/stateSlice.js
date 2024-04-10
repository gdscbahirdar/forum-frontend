import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "teacherTeacherDetails/state",
  initialState: {
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editTeacherDetailDialog: false,
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
    openEditTeacherDetailDialog: state => {
      state.editTeacherDetailDialog = true;
    },
    closeEditTeacherDetailDialog: state => {
      state.editTeacherDetailDialog = false;
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
  openEditTeacherDetailDialog,
  closeEditTeacherDetailDialog,
  updateSelectedCard
} = stateSlice.actions;

export default stateSlice.reducer;
