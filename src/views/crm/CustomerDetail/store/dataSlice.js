import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCrmCustomerDetails,
  apiDeleteCrmCustomer,
  apiPutCrmCustomer
} from "services/CrmService";

export const getCustomer = createAsyncThunk(
  "crmCustomerDetails/data/getCustomer",
  async data => {
    const response = await apiGetCrmCustomerDetails(data);
    const res_data = response.data;
    const user_data = res_data.user;
    return {
      id: res_data.pk,
      username: user_data.username,
      first_name: user_data.first_name,
      middle_name: user_data.middle_name,
      last_name: user_data.last_name,
      faculty: res_data.faculty,
      department: res_data.department,
      year_in_school: res_data.year_in_school,
      admission_date: res_data.admission_date,
      graduation_date: res_data.graduation_date
    };
  }
);

export const deleteCustomer = createAsyncThunk(
  "crmCustomerDetails/data/deleteCustomer",
  async data => {
    const response = await apiDeleteCrmCustomer(data);
    return response.data;
  }
);

export const putCustomer = createAsyncThunk(
  "crmCustomerDetails/data/putCustomer",
  async data => {
    const response = await apiPutCrmCustomer(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "crmCustomerDetails/data",
  initialState: {
    loading: false,
    profileData: {}
  },
  reducers: {
    updateProfileData: (state, action) => {
      state.profileData = action.payload;
    }
  },
  extraReducers: {
    [getCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    },
    [deleteCustomer.fulfilled]: () => {},
    [putCustomer.fulfilled]: () => {},
    [getCustomer.pending]: state => {
      state.loading = true;
    }
  }
});

export const { updateProfileData } = dataSlice.actions;

export default dataSlice.reducer;
