import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUserBadges } from "services/AccountServices";

export const getUserBadges = createAsyncThunk(
  "userBadges/data/getUserBadges",
  async username => {
    const response = await apiGetUserBadges(username);
    const transformedData = response.data.map(badge => ({
      name: badge.badge.name,
      description: badge.badge.description,
      level: badge.badge.level,
      assigned_date: badge.created_at
    }));
    return transformedData;
  }
);

const dataSlice = createSlice({
  name: "userBadges/data",
  initialState: {
    loading: false,
    userBadges: []
  },
  extraReducers: {
    [getUserBadges.fulfilled]: (state, action) => {
      state.userBadges = action.payload;
      state.loading = false;
    },
    [getUserBadges.pending]: state => {
      state.loading = true;
    }
  }
});

export default dataSlice.reducer;
