import React from "react";
import { Select, Badge } from "components/ui";
import { setFilterData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { HiCheck } from "react-icons/hi";

const { Control } = components;

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${isSelected ? "bg-gray-100 dark:bg-gray-500" : "hover:bg-gray-50 dark:hover:bg-gray-600"}`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <Badge innerClass={data.color} />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <Control {...props}>
      {selected && (
        <Badge className="ltr:ml-4 rtl:mr-4" innerClass={selected.color} />
      )}
      {children}
    </Control>
  );
};

const StudentTableFilter = () => {
  const dispatch = useDispatch();

  const faculties = useSelector(state => state.meta.faculties);
  const { department } = useSelector(state => state.students.data.filterData);

  const departments = faculties.map(faculty => faculty.departments).flat();
  const departmentOptions = departments.map(department => ({
    value: department,
    label: department
  }));

  const onYearInFilterChange = selected => {
    dispatch(setFilterData({ department: selected.value }));
  };

  return (
    <Select
      options={departmentOptions}
      size="sm"
      className="mb-4 min-w-[130px]"
      onChange={onYearInFilterChange}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl
      }}
      value={departmentOptions.filter(option => option.value === department)}
    />
  );
};

export default StudentTableFilter;
