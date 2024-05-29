import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUserQuestions } from "services/AccountServices";

export const getUserQuestions = createAsyncThunk(
  "userQuestions/data/getUserQuestions",
  async params => {
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      post__user__username: params.username
    };
    const response = await apiGetUserQuestions(updatedParams);
    const results = response.data.results;
    const transformedData = results.map(question => ({
      id: question.id,
      title: question.title,
      body: question.post.body,
      slug: question.slug,
      asked_by: question.asked_by,
      view_count: question.view_count,
      answer_count: question.answer_count,
      vote_count: question.post.vote_count,
      tags: question.tags,
      is_answered: question.is_answered,
      is_closed: question.is_closed,
      created_at: question.created_at,
      updated_at: question.updated_at
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const initialListData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: ""
};

const dataSlice = createSlice({
  name: "userQuestions/data",
  initialState: {
    loading: false,
    questionList: [],
    listData: initialListData
  },
  reducers: {
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setQuestionList: (state, action) => {
      state.questionList = action.payload;
    }
  },
  extraReducers: {
    [getUserQuestions.fulfilled]: (state, action) => {
      state.questionList = action.payload.data;
      state.listData.total = action.payload.total;
      state.loading = false;
    },
    [getUserQuestions.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setListData, setQuestionList } = dataSlice.actions;

export default dataSlice.reducer;
