import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetFeedback } from "services/FeedbackService";

export const getFeedback = createAsyncThunk(
  "feedbackEdit/data/getFeedback",
  async param => {
    const response = await apiGetFeedback(param);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "feedbackEdit/data",
  initialState: {
    loading: false,
    feedback: {}
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    }
  },
  extraReducers: {
    [getFeedback.fulfilled]: (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
    },
    [getFeedback.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setFeedback } = dataSlice.actions;

export default dataSlice.reducer;
