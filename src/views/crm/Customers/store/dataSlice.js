import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCrmCustomers, apiPutCrmCustomer } from "services/CrmService";

export const getCustomers = createAsyncThunk(
  "crmCustomers/data/getCustomers",
  async params => {
    const response = await apiGetCrmCustomers(params);
    const transformedData = response.data.map(customer => ({
      id: customer.pk,
      name: `${customer.user.first_name} ${customer.user.middle_name} ${customer.user.last_name}`,
      first_name: customer.user.first_name,
      middle_name: customer.user.middle_name,
      last_name: customer.user.last_name,
      username: customer.user.username,
      faculty: customer.faculty,
      department: customer.department,
      year_in_school: customer.year_in_school,
      admission_date: customer.admission_date,
      graduation_date: customer.graduation_date
    }));
    return {
      data: transformedData,
      total: response.data.length
    };
  }
);

export const putCustomer = createAsyncThunk(
  "crmCustomers/data/putCustomer",
  async data => {
    const response = await apiPutCrmCustomer(data);
    return response.data;
  }
);

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

export const initialFilterData = {
  status: ""
};

const dataSlice = createSlice({
  name: "crmCustomers/data",
  initialState: {
    loading: false,
    customerList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getCustomers.fulfilled]: (state, action) => {
      state.customerList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getCustomers.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setTableData, setCustomerList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
