import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateCrmCustomer,
  apiGetCrmCustomers,
  apiPutCrmCustomer
} from "services/CrmService";

export const getCustomers = createAsyncThunk(
  "crmCustomers/data/getCustomers",
  async params => {
    const response = await apiGetCrmCustomers(params);
    const transformedData = response.data.map(student => ({
      id: student.pk,
      name: `${student.user.first_name} ${student.user.middle_name} ${student.user.last_name}`,
      first_name: student.user.first_name,
      middle_name: student.user.middle_name,
      last_name: student.user.last_name,
      username: student.user.username,
      faculty: student.faculty,
      department: student.department,
      year_in_school: student.year_in_school,
      admission_date: student.admission_date,
      graduation_date: student.graduation_date
    }));
    return {
      data: transformedData,
      total: response.data.length
    };
  }
);

export const createCustomer = createAsyncThunk(
  "crmCustomerDetails/data/createCustomer",
  async data => {
    try {
      const response = await apiCreateCrmCustomer(data);
      const student = response.data;
      const transformedData = {
        id: student.pk,
        name: `${student.user.first_name} ${student.user.middle_name} ${student.user.last_name}`,
        first_name: student.user.first_name,
        middle_name: student.user.middle_name,
        last_name: student.user.last_name,
        username: student.user.username,
        faculty: student.faculty,
        department: student.department,
        year_in_school: student.year_in_school,
        admission_date: student.admission_date,
        graduation_date: student.graduation_date
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
