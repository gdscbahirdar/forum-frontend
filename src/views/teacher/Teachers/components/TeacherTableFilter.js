import React from "react";
import { Select, Badge } from "components/ui";
import { setFilterData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { HiCheck } from "react-icons/hi";

const { Control } = components;

const yearInSchoolOptions = Array.from({ length: 5 }, (_, i) => ({
  value: i + 1,
  label: `Year ${i + 1}`
}));

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

const TeacherTableFilter = () => {
  const dispatch = useDispatch();

  const { year_in_school } = useSelector(
    state => state.teachers.data.filterData
  );

  const onYearInFilterChange = selected => {
    dispatch(setFilterData({ year_in_school: selected.value }));
  };

  return (
    <Select
      options={yearInSchoolOptions}
      size="sm"
      className="mb-4 min-w-[130px]"
      onChange={onYearInFilterChange}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl
      }}
      value={yearInSchoolOptions.filter(
        option => option.value === year_in_school
      )}
    />
  );
};

export default TeacherTableFilter;
