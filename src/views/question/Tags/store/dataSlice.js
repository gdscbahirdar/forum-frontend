import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetQuestionsByTag, apiGetTags } from "services/QuestionService";

export const getTags = createAsyncThunk("data/getTags", async data => {
  const response = await apiGetTags(data);
  const results = response.data.results;
  const transformedData = results.map(tag => ({
    id: tag.pk,
    name: tag.name,
    description: tag.description
  }));
  return {
    data: transformedData,
    total: response.data.count
  };
});

export const getQuestionsByTag = createAsyncThunk(
  "data/getQuestionsByTag",
  async tag => {
    const response = await apiGetQuestionsByTag(tag);
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
  pageIndex: 0,
  pageSize: 10,
  query: "",
  sort: { order: "", key: "" }
};

export const initialFilterData = {
  name: ""
};

const dataSlice = createSlice({
  name: "tags/data",
  initialState: {
    loading: false,
    tags: [],
    listData: initialListData,
    filterData: {}
  },
  reducers: {
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    }
  },
  extraReducers: {
    [getTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
      state.listData.total = action.payload.length;
    },
    [getTags.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setListData, setFilterData, setTags } = dataSlice.actions;

export default dataSlice.reducer;
