import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUserProfile } from "services/AccountServices";

export const getUserProfile = createAsyncThunk(
  "userProfile/data/getUserProfile",
  async username => {
    const response = await apiGetUserProfile(username);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "userProfile/data",
  initialState: {
    loading: false,
    userData: []
  },
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [getUserProfile.pending]: state => {
      state.loading = true;
    }
  }
});

export default dataSlice.reducer;
