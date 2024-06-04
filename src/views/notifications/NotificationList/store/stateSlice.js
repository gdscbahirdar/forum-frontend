import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "notificationList/state",
  initialState: {
    selectedRows: [],
    selectedRow: [],
    deleteMode: "",
    unsubscribeMode: ""
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    addRowItem: (state, { payload }) => {
      const currentState = current(state);
      if (!currentState.selectedRows.includes(payload)) {
        return {
          selectedRows: [...currentState.selectedRows, ...payload]
        };
      }
    },
    removeRowItem: (state, { payload }) => {
      const currentState = current(state);
      if (currentState.selectedRows.includes(payload)) {
        return {
          selectedRows: currentState.selectedRows.filter(id => id !== payload)
        };
      }
    },
    setDeleteMode: (state, action) => {
      state.deleteMode = action.payload;
    },
    setUnsubscribeMode: (state, action) => {
      state.unsubscribeMode = action.payload;
    }
  }
});

export const {
  setSelectedRows,
  setSelectedRow,
  addRowItem,
  removeRowItem,
  setDeleteMode,
  setUnsubscribeMode
} = stateSlice.actions;

export default stateSlice.reducer;
