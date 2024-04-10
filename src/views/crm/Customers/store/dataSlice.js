import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateCrmCustomer,
  apiGetCrmCustomers,
  apiPutCrmCustomer
} from "services/CrmService";

export const getCustomers = createAsyncThunk(
  "crmCustomers/data/getCustomers",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };
    if (params.filterData.year_in_school) {
      updatedParams.student__year_in_school = params.filterData.year_in_school;
    }
    const response = await apiGetCrmCustomers(updatedParams);
    const results = response.data.results;
    const transformedData = results.map(user => ({
      id: user.pk,
      name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      username: user.username,
      faculty: user.student.faculty,
      department: user.student.department,
      year_in_school: user.student.year_in_school,
      admission_date: user.student.admission_date,
      graduation_date: user.student.graduation_date
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const createCustomer = createAsyncThunk(
  "crmCustomerDetails/data/createCustomer",
  async data => {
    try {
      const response = await apiCreateCrmCustomer(data);
      const user = response.data;
      const transformedData = {
        id: user.pk,
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        faculty: user.student.faculty,
        department: user.student.department,
        year_in_school: user.student.year_in_school,
        admission_date: user.student.admission_date,
        graduation_date: user.student.graduation_date
      };
      return { response: transformedData, success: true };
    } catch (errors) {
      return { response: errors?.response?.data, success: false };
    }
  }
);

export const putCustomer = createAsyncThunk(
  "crmCustomers/data/putCustomer",
  async data => {
    try {
      const { id, editedCustomer } = data;
      const response = await apiPutCrmCustomer(id, editedCustomer);
      const user = response.data;
      const transformedData = {
        id: user.pk,
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        faculty: user.student.faculty,
        department: user.student.department,
        year_in_school: user.student.year_in_school,
        admission_date: user.student.admission_date,
        graduation_date: user.student.graduation_date
      };
      return { response: transformedData, success: true };
    } catch (errors) {
      return { response: errors?.response?.data, success: false };
    }
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
  year_in_school: ""
};

const dataSlice = createSlice({
  name: "crmCustomers/data",
  initialState: {
    loading: false,
    customerList: [],
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
