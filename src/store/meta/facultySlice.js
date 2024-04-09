import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

export const facultySlice = createSlice({
  name: "meta/faculties",
  initialState,
  reducers: {
    setFaculties: (_, action) => action.payload
  }
});

export const { setFaculties } = facultySlice.actions;

export default facultySlice.reducer;
