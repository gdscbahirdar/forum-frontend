import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUserBookmarks } from "services/BookmarkService";

export const getUserBookmarks = createAsyncThunk(
  "bookmarks/data/getUserBookmarks",
  async () => {
    let response = {};
    response = await apiGetUserBookmarks();
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

const dataSlice = createSlice({
  name: "bookmarks/data",
  initialState: {
    loading: false,
    bookmarkList: []
  },
  reducers: {
    setUserBookmarkList: (state, action) => {
      state.bookmarkList = action.payload;
    }
  },
  extraReducers: {
    [getUserBookmarks.fulfilled]: (state, action) => {
      state.bookmarkList = action.payload.data;
      state.loading = false;
    },
    [getUserBookmarks.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setUserBookmarkList } = dataSlice.actions;

export default dataSlice.reducer;
