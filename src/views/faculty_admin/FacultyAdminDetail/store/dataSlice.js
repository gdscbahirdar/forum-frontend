import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetFacultyAdminDetails,
  apiDeleteFacultyAdmin,
  apiPutFacultyAdmin
} from "services/FacultyAdminService";

export const getFacultyAdmin = createAsyncThunk(
  "facultyAdminDetails/data/getFacultyAdmin",
  async data => {
    const response = await apiGetFacultyAdminDetails(data);
    const user = response.data;
    return {
      id: user.pk,
      username: user.username,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      gender: user.gender,
      faculty: user.faculty_admin.faculty
    };
  }
);

export const deleteFacultyAdmin = createAsyncThunk(
  "facultyAdminDetails/data/deleteFacultyAdmin",
  async data => {
    const response = await apiDeleteFacultyAdmin(data);
    return response.data;
  }
);

export const putFacultyAdmin = createAsyncThunk(
  "facultyAdminDetails/data/putFacultyAdmin",
  async data => {
    const response = await apiPutFacultyAdmin(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "facultyAdminDetails/data",
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
    [getFacultyAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    },
    [deleteFacultyAdmin.fulfilled]: () => {},
    [putFacultyAdmin.fulfilled]: () => {},
    [getFacultyAdmin.pending]: state => {
      state.loading = true;
    }
  }
});

export const { updateProfileData } = dataSlice.actions;

export default dataSlice.reducer;
