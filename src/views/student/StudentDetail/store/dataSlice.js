import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetStudentDetails,
  apiDeleteStudent,
  apiPutStudent
} from "services/StudentService";

export const getStudent = createAsyncThunk(
  "studentStudentDetails/data/getStudent",
  async data => {
    const response = await apiGetStudentDetails(data);
    const user = response.data;
    return {
      id: user.pk,
      username: user.username,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      faculty: user.student.faculty,
      department: user.student.department,
      gender: user.gender,
      year_in_school: user.student.year_in_school,
      admission_date: user.student.admission_date,
      graduation_date: user.student.graduation_date
    };
  }
);

export const deleteStudent = createAsyncThunk(
  "studentStudentDetails/data/deleteStudent",
  async data => {
    const response = await apiDeleteStudent(data);
    return response.data;
  }
);

export const putStudent = createAsyncThunk(
  "studentStudentDetails/data/putStudent",
  async data => {
    const response = await apiPutStudent(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "studentStudentDetails/data",
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
    [getStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    },
    [deleteStudent.fulfilled]: () => {},
    [putStudent.fulfilled]: () => {},
    [getStudent.pending]: state => {
      state.loading = true;
    }
  }
});

export const { updateProfileData } = dataSlice.actions;

export default dataSlice.reducer;
