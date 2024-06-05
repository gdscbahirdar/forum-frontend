import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateTeacher,
  apiGetTeachers,
  apiPutTeacher
} from "services/TeacherService";

export const getTeachers = createAsyncThunk(
  "teachers/data/getTeachers",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };
    if (params.filterData.faculty) {
      updatedParams.teacher__faculty = params.filterData.faculty;
    }
    const response = await apiGetTeachers(updatedParams);
    const results = response.data.results;
    const transformedData = results.map(user => ({
      id: user.pk,
      name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      username: user.username,
      gender: user.gender,
      faculty: user.teacher.faculty,
      departments: user.teacher.departments
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const createTeacher = createAsyncThunk(
  "teacherTeacherDetails/data/createTeacher",
  async data => {
    try {
      const response = await apiCreateTeacher(data);
      const user = response.data;
      const transformedData = {
        id: user.pk,
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        gender: user.gender,
        faculty: user.teacher.faculty,
        departments: user.teacher.departments
      };
      return { response: transformedData, success: true };
    } catch (errors) {
      return { response: errors?.response?.data, success: false };
    }
  }
);

export const putTeacher = createAsyncThunk(
  "teachers/data/putTeacher",
  async data => {
    try {
      const { id, editedTeacher } = data;
      const response = await apiPutTeacher(id, editedTeacher);
      const user = response.data;
      const transformedData = {
        id: user.pk,
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        gender: user.gender,
        faculty: user.teacher.faculty,
        departments: user.teacher.departments
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
  faculty: ""
};

const dataSlice = createSlice({
  name: "teachers/data",
  initialState: {
    loading: false,
    teacherList: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setTeacherList: (state, action) => {
      state.teacherList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getTeachers.fulfilled]: (state, action) => {
      state.teacherList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getTeachers.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setTableData, setTeacherList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
