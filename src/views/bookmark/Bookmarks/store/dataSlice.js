import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetUserBookmarkedPosts,
  apiGetUserBookmarkedResources
} from "services/BookmarkService";

export const getUserBookmarkedPosts = createAsyncThunk(
  "bookmarks/data/getUserBookmarkedPosts",
  async () => {
    let response = {};
    response = await apiGetUserBookmarkedPosts();
    const results = response.data.results;
    const transformedData = results.map(question => ({
      id: question.id,
      slug: question.slug,
      title: question.title,
      body: question.post.body,
      asked_by: question.asked_by,
      view_count: question.view_count,
      answer_count: question.answer_count,
      vote_count: question.post.vote_count,
      tags: question.tags,
      is_answered: question.is_answered,
      is_closed: question.is_closed,
      created_at: question.created_at,
      updated_at: question.updated_at,
      bookmarked_answers: question.bookmarked_answers
    }));
    return {
      data: transformedData
    };
  }
);

export const getUserBookmarkedResources = createAsyncThunk(
  "bookmarks/data/getUserBookmarkedResources",
  async () => {
    let response = {};
    response = await apiGetUserBookmarkedResources();
    const results = response.data.results;
    const transformedData = results.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      user: resource.user,
      view_count: resource.view_count,
      vote_count: resource.vote_count,
      tags: resource.tags,
      categories: resource.categories,
      created_at: resource.created_at,
      updated_at: resource.updated_at
    }));
    return {
      data: transformedData
    };
  }
);

const dataSlice = createSlice({
  name: "bookmarks/data",
  initialState: {
    loading: false,
    bookmarkList: [],
    bookmarkedResources: []
  },
  reducers: {
    setUserBookmarkList: (state, action) => {
      state.bookmarkList = action.payload;
    }
  },
  extraReducers: {
    [getUserBookmarkedPosts.fulfilled]: (state, action) => {
      state.bookmarkList = action.payload.data;
      state.loading = false;
    },
    [getUserBookmarkedPosts.pending]: state => {
      state.loading = true;
    },
    [getUserBookmarkedResources.fulfilled]: (state, action) => {
      state.bookmarkedResources = action.payload.data;
      state.loading = false;
    },
    [getUserBookmarkedResources.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setUserBookmarkList } = dataSlice.actions;

export default dataSlice.reducer;
