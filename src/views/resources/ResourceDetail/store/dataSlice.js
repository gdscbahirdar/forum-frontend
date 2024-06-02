import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetResource,
  apiPutResource,
  apiDeleteResource,
  apiCreateVote,
  apiCreateBookmark,
  apiDeleteBookmark,
  apiCreateComment,
  apiGetComments
} from "services/ResourceService";

export const getResource = createAsyncThunk(
  "resourcesDetail/data/getResources",
  async data => {
    const response = await apiGetResource(data);
    return response.data;
  }
);

export const updateResource = async data => {
  const response = await apiPutResource(data);
  return response.data;
};

export const deleteResource = async data => {
  const response = await apiDeleteResource(data);
  return response.data;
};

export const createVote = createAsyncThunk(
  "questionDetails/data/createVote",
  async (data, { dispatch }) => {
    const { resourceId, vote_data } = data;

    const response = await apiCreateVote(vote_data);
    dispatch(getResource(resourceId));
    return response.data;
  }
);

export const createComment = createAsyncThunk(
  "questionDetails/data/createComment",
  async (data, { dispatch }) => {
    const { resourceId, text } = data;
    const response = await apiCreateComment(resourceId, { text });
    dispatch(getResource(resourceId));

    return response.data;
  }
);

export const getComments = createAsyncThunk(
  "questionDetails/data/getComments",
  async data => {
    const response = await apiGetComments(data);
    const results = response.data.results;
    const transformedData = results.map(comment => ({
      id: comment.id,
      body: comment.text,
      commented_by: comment.commented_by,
      commenter_avatar: comment.commenter_avatar,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const createBookmark = createAsyncThunk(
  "questionDetails/data/createBookmark",
  async (data, { dispatch }) => {
    const { resourceId, post_id } = data;

    const response = await apiCreateBookmark(post_id);
    dispatch(getResource(resourceId));

    return response.data;
  }
);

export const deleteBookmark = createAsyncThunk(
  "questionDetails/data/deleteBookmark",
  async (data, { dispatch }) => {
    const { resourceId, post_id } = data;

    const response = await apiDeleteBookmark(post_id);
    dispatch(getResource(resourceId));

    return response.data;
  }
);

const dataSlice = createSlice({
  name: "resourcesDetail/data",
  initialState: {
    loading: false,
    comments: [],
    resourceData: [],
    deleteConfirmation: false,
    selectedResource: ""
  },
  reducers: {},
  extraReducers: {
    [getResource.fulfilled]: (state, action) => {
      state.resourceData = action.payload;
      state.loading = false;
    },
    [getResource.pending]: state => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload.data;
      state.loading = false;
    }
  }
});

export default dataSlice.reducer;
