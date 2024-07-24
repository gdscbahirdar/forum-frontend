import React, { useRef } from "react";
import { Button } from "components/ui";
import { getStudents, setTableData, setFilterData } from "../store/dataSlice";
import StudentTableSearch from "./StudentTableSearch";
import StudentTableFilter from "./StudentTableFilter";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlinePlusCircle, HiOutlineUpload } from "react-icons/hi";
import {
  toggleNewStudentDialog,
  toggleStudentsUpload
} from "../store/stateSlice";

const StudentsTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector(state => state.students.data.tableData);

  const handleSearch = () => {
    const query = inputRef.current.value;
    const newTableData = cloneDeep(tableData);
    newTableData.query = query;
    newTableData.pageIndex = 1;
    fetchData(newTableData);
  };

  const onAddNewStudent = () => {
    dispatch(toggleNewStudentDialog(true));
  };

  const onBulkCreateStudents = () => {
    dispatch(toggleStudentsUpload(true));
  };

  const fetchData = data => {
    dispatch(setTableData(data));
    dispatch(getStudents(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ department: "" }));
    fetchData(newTableData);
  };

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">Students</h3>
      <div className="flex flex-col md:flex-row lg:items-center gap-2">
        <StudentTableSearch ref={inputRef} onSearch={handleSearch} />
        <StudentTableFilter />
        <Button className="max-w-md mb-4" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
        <Button
          size="sm"
          className="max-w-md mb-4"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewStudent}
        >
          New Student
        </Button>
        <Button
          size="sm"
          className="max-w-md mb-4"
          variant="twoTone"
          icon={<HiOutlineUpload />}
          onClick={onBulkCreateStudents}
        >
          Bulk Create
        </Button>
      </div>
    </div>
  );
};

export default StudentsTableTools;
