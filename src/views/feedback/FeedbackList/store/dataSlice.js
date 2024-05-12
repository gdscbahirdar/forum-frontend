import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiDeleteFeedback,
  apiGetFeedbackList
} from "services/FeedbackService";

export const getFeedbackList = createAsyncThunk(
  "feedback/data/getFeedbackList",
  async () => {
    const response = await apiGetFeedbackList();
    const results = response.data.results;
    const transformedData = results.map(feedback => ({
      id: feedback.pk,
      title: feedback.title,
      message: feedback.message,
      author_avatar: feedback.author_avatar
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/data/deleteFeedback",
  async id => {
    const response = await apiDeleteFeedback(id);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "feedback/data",
  initialState: {
    loading: false,
    feedbackList: []
  },
  extraReducers: {
    [getFeedbackList.fulfilled]: (state, action) => {
      state.loading = false;
      state.feedbackList = action.payload.data;
    },
    [getFeedbackList.pending]: state => {
      state.loading = true;
    }
  }
});

export default dataSlice.reducer;
