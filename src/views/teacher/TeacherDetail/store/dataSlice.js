import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetTeacherDetails,
  apiDeleteTeacher,
  apiPutTeacher
} from "services/TeacherService";

export const getTeacher = createAsyncThunk(
  "teacherTeacherDetails/data/getTeacher",
  async data => {
    const response = await apiGetTeacherDetails(data);
    const user = response.data;
    return {
      id: user.pk,
      username: user.username,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      gender: user.gender,
      faculty: user.teacher.faculty,
      departments: user.teacher.departments
    };
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacherTeacherDetails/data/deleteTeacher",
  async data => {
    const response = await apiDeleteTeacher(data);
    return response.data;
  }
);

export const putTeacher = createAsyncThunk(
  "teacherTeacherDetails/data/putTeacher",
  async data => {
    const response = await apiPutTeacher(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "teacherTeacherDetails/data",
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
    [getTeacher.fulfilled]: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    },
    [deleteTeacher.fulfilled]: () => {},
    [putTeacher.fulfilled]: () => {},
    [getTeacher.pending]: state => {
      state.loading = true;
    }
  }
});

export const { updateProfileData } = dataSlice.actions;

export default dataSlice.reducer;
