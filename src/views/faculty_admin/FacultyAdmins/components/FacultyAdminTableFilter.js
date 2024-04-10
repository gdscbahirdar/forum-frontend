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

const FacultyAdminTableFilter = () => {
  const dispatch = useDispatch();

  const faculties = useSelector(state => state.meta.faculties);
  const facultyOptions = faculties.map(faculty => ({
    value: faculty.pk,
    label: faculty.name
  }));

  const { faculty } = useSelector(
    state => state.faculty_admins.data.filterData
  );

  const onFacultyChange = selected => {
    dispatch(setFilterData({ faculty: selected.value }));
  };

  return (
    <Select
      options={facultyOptions}
      size="sm"
      className="mb-4 min-w-[130px]"
      onChange={onFacultyChange}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl
      }}
      value={facultyOptions.filter(option => option.value === faculty)}
    />
  );
};

export default FacultyAdminTableFilter;
