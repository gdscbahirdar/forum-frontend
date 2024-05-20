import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetLeaderBoardData } from "services/LeaderBoardService";

export const getLeaderBoardData = createAsyncThunk(
  "leaderBoard/data/getLeaderBoardData",
  async (timeframe = "all") => {
    const response = await apiGetLeaderBoardData(timeframe);
    return response.data;
  }
);

export const initialFilterData = {
  timeframe: ""
};

const dataSlice = createSlice({
  name: "leaderBoard/data",
  initialState: {
    loading: true,
    leaderBoard: {},
    filterData: initialFilterData
  },
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getLeaderBoardData.fulfilled]: (state, action) => {
      state.leaderBoard = action.payload;
      state.loading = false;
    },
    [getLeaderBoardData.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
