import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiGetQuestions,
  apiCreateQuestion,
  apiPutQuestion,
  apiGetQuestionsByTag
} from "services/QuestionService";

export const getQuestions = createAsyncThunk(
  "questions/data/getQuestions",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };
    let response = {};
    if (params.tag) {
      response = await apiGetQuestionsByTag(params.tag);
    } else {
      response = await apiGetQuestions(updatedParams);
    }
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

export const createQuestion = createAsyncThunk(
  "questions/data/createQuestion",
  async data => {
    try {
      const response = await apiCreateQuestion(data);
      const question = response.data;
      const transformedData = {
        id: question.pk,
        title: question.title,
        description: question.description,
        created_at: question.created_at,
        updated_at: question.updated_at
      };
      return transformedData;
    } catch (error) {
      return error;
    }
  }
);

export const putQuestion = createAsyncThunk(
  "questions/data/putQuestion",
  async data => {
    try {
      const response = await apiPutQuestion(data.id, data);
      const question = response.data;
      const transformedData = {
        id: question.pk,
        title: question.title,
        description: question.description,
        created_at: question.created_at,
        updated_at: question.updated_at
      };
      return transformedData;
    } catch (error) {
      return error;
    }
  }
);

export const initialListData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: { order: "", key: "" }
};

export const initialFilterData = {
  is_answered: ""
};

const dataSlice = createSlice({
  name: "questions/data",
  initialState: {
    loading: false,
    questionList: [],
    listData: initialListData,
    filterData: initialFilterData
  },
  reducers: {
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getQuestions.fulfilled]: (state, action) => {
      state.questionList = action.payload.data;
      state.listData.total = action.payload.total;
      state.loading = false;
    },
    [getQuestions.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setListData, setQuestionList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
