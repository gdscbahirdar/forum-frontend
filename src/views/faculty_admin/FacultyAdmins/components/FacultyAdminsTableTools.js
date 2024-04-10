import React, { useRef } from "react";
import { Button } from "components/ui";
import {
  getFacultyAdmins,
  setTableData,
  setFilterData
} from "../store/dataSlice";
import FacultyAdminTableSearch from "./FacultyAdminTableSearch";
import FacultyAdminTableFilter from "./FacultyAdminTableFilter";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { toggleNewFacultyAdminDialog } from "../store/stateSlice";

const FacultyAdminsTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector(state => state.faculty_admins.data.tableData);

  const handleInputChange = val => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  };

  const onAddNewFacultyAdmin = () => {
    dispatch(toggleNewFacultyAdminDialog(true));
  };

  const fetchData = data => {
    dispatch(setTableData(data));
    dispatch(getFacultyAdmins(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ year_in_school: "" }));
    fetchData(newTableData);
  };

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">FacultyAdmins</h3>
      <div className="flex flex-col md:flex-row lg:items-center gap-2">
        <FacultyAdminTableSearch
          ref={inputRef}
          onInputChange={handleInputChange}
        />
        <FacultyAdminTableFilter />
        <Button className="max-w-md mb-4" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
        <Button
          size="sm"
          className="max-w-md mb-4"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewFacultyAdmin}
        >
          New FacultyAdmin
        </Button>
      </div>
    </div>
  );
};

export default FacultyAdminsTableTools;
