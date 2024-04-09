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
    const user = response.data;
    return {
      id: user.pk,
      username: user.username,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      faculty: user.student.faculty,
      department: user.student.department,
      year_in_school: user.student.year_in_school,
      admission_date: user.student.admission_date,
      graduation_date: user.student.graduation_date
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
