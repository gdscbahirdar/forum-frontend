import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateFacultyAdmin,
  apiGetFacultyAdmins,
  apiPutFacultyAdmin
} from "services/FacultyAdminService";

export const getFacultyAdmins = createAsyncThunk(
  "faculty_admins/data/getFacultyAdmins",
  async params => {
    const { key, order } = params.sort;
    const updatedParams = {
      page: params.pageIndex,
      size: params.pageSize,
      sort: order === "desc" ? `-${key}` : key,
      search: params.query
    };
    if (params.filterData.faculty) {
      updatedParams.faculty_admin__faculty = params.filterData.faculty;
    }
    const response = await apiGetFacultyAdmins(updatedParams);
    const results = response.data.results;
    const transformedData = results.map(user => ({
      id: user.pk,
      name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      username: user.username,
      gender: user.gender,
      faculty: user.faculty_admin.faculty
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const createFacultyAdmin = createAsyncThunk(
  "facultyAdminDetails/data/createFacultyAdmin",
  async data => {
    try {
      const response = await apiCreateFacultyAdmin(data);
      const user = response.data;
      const transformedData = {
        id: user.pk,
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        gender: user.gender,
        faculty: user.faculty_admin.faculty
      };
      return { response: transformedData, success: true };
    } catch (errors) {
      return { response: errors?.response?.data, success: false };
    }
  }
);

export const putFacultyAdmin = createAsyncThunk(
  "faculty_admins/data/putFacultyAdmin",
  async data => {
    try {
      const { id, editedFacultyAdmin } = data;
      const response = await apiPutFacultyAdmin(id, editedFacultyAdmin);
      const user = response.data;
      const transformedData = {
        id: user.pk,
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username,
        gender: user.gender,
        faculty: user.faculty_admin.faculty
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
  name: "faculty_admins/data",
  initialState: {
    loading: false,
    facultyAdminList: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFacultyAdminList: (state, action) => {
      state.facultyAdminList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  },
  extraReducers: {
    [getFacultyAdmins.fulfilled]: (state, action) => {
      state.facultyAdminList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    },
    [getFacultyAdmins.pending]: state => {
      state.loading = true;
    }
  }
});

export const { setTableData, setFacultyAdminList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
