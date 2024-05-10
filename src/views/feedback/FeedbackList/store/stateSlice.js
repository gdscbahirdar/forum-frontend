import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "feedback/state",
  initialState: {
    feedbackDeleteConfirmation: false,
    selectedFeedback: ""
  },
  reducers: {
    toggleFeedbackDeleteConfirmation: (state, action) => {
      state.feedbackDeleteConfirmation = action.payload;
    },
    setSelectedFeedback: (state, action) => {
      state.selectedFeedback = action.payload;
    }
  }
});

export const { toggleFeedbackDeleteConfirmation, setSelectedFeedback } =
  dataSlice.actions;

export default dataSlice.reducer;
