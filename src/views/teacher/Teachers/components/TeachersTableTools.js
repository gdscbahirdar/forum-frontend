import React, { useRef } from "react";
import { Button } from "components/ui";
import { getTeachers, setTableData, setFilterData } from "../store/dataSlice";
import TeacherTableSearch from "./TeacherTableSearch";
import TeacherTableFilter from "./TeacherTableFilter";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { toggleNewTeacherDialog } from "../store/stateSlice";

const TeachersTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector(state => state.teachers.data.tableData);

  const handleSearch = () => {
    const query = inputRef.current.value;
    const newTableData = cloneDeep(tableData);
    newTableData.query = query;
    newTableData.pageIndex = 1;
    fetchData(newTableData);
  };

  const onAddNewTeacher = () => {
    dispatch(toggleNewTeacherDialog(true));
  };

  const fetchData = data => {
    dispatch(setTableData(data));
    dispatch(getTeachers(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ faculty: "" }));
    fetchData(newTableData);
  };

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">Teachers</h3>
      <div className="flex flex-col md:flex-row lg:items-center gap-2">
        <TeacherTableSearch ref={inputRef} onSearch={handleSearch} />
        <TeacherTableFilter />
        <Button className="max-w-md mb-4" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
        <Button
          size="sm"
          className="max-w-md mb-4"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewTeacher}
        >
          New Teacher
        </Button>
      </div>
    </div>
  );
};

export default TeachersTableTools;
