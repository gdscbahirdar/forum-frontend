import React, { useRef } from "react";
import { Button } from "components/ui";
import { getCustomers, setTableData, setFilterData } from "../store/dataSlice";
import CustomerTableSearch from "./CustomerTableSearch";
import CustomerTableFilter from "./CustomerTableFilter";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { toggleNewCustomerDialog } from "../store/stateSlice";

const CustomersTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector(state => state.crmCustomers.data.tableData);

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

  const onAddNewCustomer = () => {
    dispatch(toggleNewCustomerDialog(true));
  };

  const fetchData = data => {
    dispatch(setTableData(data));
    dispatch(getCustomers(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ status: "" }));
    fetchData(newTableData);
  };

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">Students</h3>
      <div className="flex flex-col md:flex-row lg:items-center gap-2">
        <CustomerTableSearch ref={inputRef} onInputChange={handleInputChange} />
        <CustomerTableFilter />
        <Button className="max-w-md mb-4" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
        <Button
          size="sm"
          className="max-w-md mb-4"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewCustomer}
        >
          New Student
        </Button>
      </div>
    </div>
  );
};

export default CustomersTableTools;
