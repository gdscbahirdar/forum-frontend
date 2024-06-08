import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateStudent,
  apiGetStudents,
  apiPutStudent
} from "services/StudentService";

export const getStudents = createAsyncThunk(
  "students/data/getStudents",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };
    if (params.filterData.department) {
      updatedParams.student__department__name = params.filterData.department;
    }
    const response = await apiGetStudents(updatedParams);
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
      gender: user.gender,
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

export const createStudent = createAsyncThunk(
  "studentStudentDetails/data/createStudent",
  async data => {
    try {
      const response = await apiCreateStudent(data);
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
        gender: user.gender,
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

export const putStudent = createAsyncThunk(
  "students/data/putStudent",
  async data => {
    try {
      const { id, editedStudent } = data;
      const response = await apiPutStudent(id, editedStudent);
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
        gender: user.gender,
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
  department: ""
};

const dataSlice = createSlice({
  name: "students/data",
  initialState: {
    loading: false,
    studentList: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getStudents.fulfilled]: (state, action) => {
      state.studentList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getStudents.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setTableData, setStudentList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
