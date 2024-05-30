import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetResource,
  apiPutResource,
  apiDeleteResource,
  apiCreateVote
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

const dataSlice = createSlice({
  name: "resourcesDetail/data",
  initialState: {
    loading: false,
    resourceData: []
  },
  reducers: {},
  extraReducers: {
    [getResource.fulfilled]: (state, action) => {
      state.resourceData = action.payload;
      state.loading = false;
    },
    [getResource.pending]: state => {
      state.loading = true;
    }
  }
});

export default dataSlice.reducer;
