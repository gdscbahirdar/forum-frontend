import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetNotificationList,
  apiPostNotificationAction
} from "services/NotificationService";

export const getNotifications = createAsyncThunk(
  "notificationList/data/getNotifications",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };
    const response = await apiGetNotificationList(updatedParams);
    return {
      data: response.data.results,
      total: response.data.count
    };
  }
);

export const deleteNotifications = async items => {
  const response = await apiPostNotificationAction("delete_any", {
    ids: items
  });
  return response.status;
};

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: ""
  }
};

const dataSlice = createSlice({
  name: "notificationList/data",
  initialState: {
    loading: false,
    notificationList: [],
    tableData: initialTableData
  },
  reducers: {
    setNotificationList: (state, action) => {
      state.notificationList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    }
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, action) => {
      state.notificationList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getNotifications.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setNotificationList, setTableData } = dataSlice.actions;

export default dataSlice.reducer;
