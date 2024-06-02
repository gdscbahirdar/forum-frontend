import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetResources,
  apiDeleteResource,
  apiGetMyResources,
  apiGetResourceCategories
} from "services/ResourceService";

export const getResources = createAsyncThunk(
  "resources/data/getResources",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query || params.title,
      ...(params.categories.length !== 0 && {
        categories: params.categories.join(",")
      }),
      ...(params.tags.length !== 0 && { tags: params.tags.join(",") })
    };

    const response = await apiGetResources(updatedParams);

    const results = response.data.results;
    const transformedData = results.map(resources => ({
      id: resources.id,
      name: resources.title,
      description: resources.description,
      user: resources.user,
      view_count: resources.view_count,
      categories: resources.categories,
      tags: resources.tags
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const getMyResources = createAsyncThunk(
  "resources/data/getMyResources",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };

    const response = await apiGetMyResources(updatedParams);

    const results = response.data.results;
    const transformedData = results.map(resources => ({
      id: resources.id,
      name: resources.title,
      description: resources.description,
      user: resources.user,
      view_count: resources.view_count,
      categories: resources.categories,
      tags: resources.tags
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const deleteResource = async data => {
  const response = await apiDeleteResource(data);
  return response.status;
};

export const getResourceCategories = createAsyncThunk(
  "resources/data/getResourceCategories",
  async params => {
    let updatedParams = {};

    if (params.search) {
      updatedParams = {
        search: params.search
      };
    } else {
      updatedParams = {
        page: params.pageIndex,
        size: params.pageSize
      };
    }

    const response = await apiGetResourceCategories(updatedParams);
    const results = response.data.results;
    const transformedData = results.map(category => ({
      id: category.pk,
      name: category.name,
      description: category.description
    }));

    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  categories: [],
  tags: [],
  sort: {
    order: "",
    key: ""
  }
};

export const initialFilterData = {
  title: "",
  categories: [],
  tags: []
};

const dataSlice = createSlice({
  name: "resources/data",
  initialState: {
    loading: false,
    resourceList: [],
    categories: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    updateResourceList: (state, action) => {
      state.resourceList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getResources.fulfilled]: (state, action) => {
      state.resourceList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getResources.pending]: state => {
      state.loading = true;
    },
    [getMyResources.fulfilled]: (state, action) => {
      state.resourceList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getMyResources.pending]: state => {
      state.loading = true;
    },
    [getResourceCategories.fulfilled]: (state, action) => {
      state.categories = action.payload.data;
    }
  }
});

export const {
  updateResourceList,
  setTableData,
  setFilterData,
  setSortedColumn
} = dataSlice.actions;

export default dataSlice.reducer;
