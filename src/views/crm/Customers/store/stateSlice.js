import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "crmCustomers/state",
  initialState: {
    drawerOpen: false,
    selectedCustomer: {},
    sortedColumn: () => {},
    newCustomerDialog: false
  },
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
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
    toggleNewCustomerDialog: (state, action) => {
      state.newCustomerDialog = action.payload;
    }
  }
});

export const {
  setSelectedCustomer,
  setDrawerOpen,
  setDrawerClose,
  setSortedColumn,
  toggleNewCustomerDialog
} = stateSlice.actions;

export default stateSlice.reducer;
