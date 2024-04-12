import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetQuestionDetails,
  apiDeleteQuestion,
  apiPutQuestion,
  apiGetOthersQuestionList
} from "services/QuestionService";

export const getQuestion = createAsyncThunk(
  "questionDetails/data/getQuestion",
  async data => {
    const response = await apiGetQuestionDetails(data);
    const question = response.data;
    return {
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
    };
  }
);

export const getOthersQuestion = createAsyncThunk(
  "questionDetails/data/getOthersQuestion",
  async data => {
    const response = await apiGetOthersQuestionList(data);
    const related_questions = response.data.related_questions.map(question => ({
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
    const popular_questions = response.data.popular_questions.map(question => ({
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
      relatedQuestion: related_questions,
      popularQuestion: popular_questions
    };
  }
);

export const deleteQuestion = createAsyncThunk(
  "questionDetails/data/deleteQuestion",
  async data => {
    const response = await apiDeleteQuestion(data);
    return response.data;
  }
);

export const putQuestion = createAsyncThunk(
  "questionDetails/data/putQuestion",
  async data => {
    const response = await apiPutQuestion(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "questionDetails/data",
  initialState: {
    loading: false,
    questionData: {},
    otherLoading: false,
    othersQuestion: {
      relatedQuestion: [],
      popularQuestion: []
    }
  },
  reducers: {
    updateQuestionData: (state, action) => {
      state.questionData = action.payload;
    }
  },
  extraReducers: {
    [getQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.questionData = action.payload;
    },
    [deleteQuestion.fulfilled]: () => {},
    [putQuestion.fulfilled]: () => {},
    [getQuestion.pending]: state => {
      state.loading = true;
    },
    [getOthersQuestion.fulfilled]: (state, action) => {
      state.otherLoading = false;
      state.othersQuestion = action.payload;
    },
    [getOthersQuestion.pending]: state => {
      state.otherLoading = true;
    }
  }
});

export const { updateQuestionData } = dataSlice.actions;

export default dataSlice.reducer;
