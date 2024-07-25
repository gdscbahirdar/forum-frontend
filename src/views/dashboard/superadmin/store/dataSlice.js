import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetForumDashboardData } from "services/DashboardService";

export const getForumDashboardData = createAsyncThunk(
  "superAdminDashboard/data/getForumDashboardData",
  async data => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ", data);
    const { startDate, endDate } = data;
    const response = await apiGetForumDashboardData({ startDate, endDate });
    return response.data;
  }
);

export const initialFilterData = {
  status: ""
};

const dataSlice = createSlice({
  name: "superAdminDashboard/data",
  initialState: {
    loading: true,
    dashboardData: {}
  },
  reducers: {},
  extraReducers: {
    [getForumDashboardData.fulfilled]: (state, action) => {
      state.dashboardData = action.payload;
      state.loading = false;
    },
    [getForumDashboardData.pending]: state => {
      state.loading = true;
    }
  }
});

export default dataSlice.reducer;
