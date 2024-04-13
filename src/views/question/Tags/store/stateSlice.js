import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "tags/state",
  initialState: {
    query: {
      search: ""
    }
  },
  reducers: {
    setSearch: (state, action) => {
      state.query.search = action.payload;
    }
  }
});

export const { toggleView, toggleSort, setSearch } = stateSlice.actions;

export default stateSlice.reducer;
