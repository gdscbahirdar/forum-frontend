import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetResource,
  apiPutResource,
  apiDeleteResource
} from "services/ResourceService";

export const getResource = createAsyncThunk(
  "resourcesEdit/data/getResources",
  async data => {
    const response = await apiGetResource(data);
    return response.data;
  }
);

export const updateResource = async data => {
  const { id, resource } = data;
  const response = await apiPutResource(id, resource);
  return response.data;
};

export const deleteResource = async data => {
  const response = await apiDeleteResource(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "resourcesEdit/data",
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
