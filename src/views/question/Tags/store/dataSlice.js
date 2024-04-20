import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetTags } from "services/QuestionService";

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
