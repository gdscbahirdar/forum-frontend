import React, { useRef } from "react";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import ResourceTableSearch from "./ResourceTableSearch";
import ResourceFilter from "./ResourceFilter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { getResources, setFilterData, setTableData } from "../store/dataSlice";

const ResourceTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector(state => state.resources.data.tableData);

  const handleSearch = () => {
    const query = inputRef.current.value;
    const newTableData = cloneDeep(tableData);
    newTableData.query = query;
    newTableData.pageIndex = 1;
    fetchData(newTableData);
  };

  const fetchData = data => {
    dispatch(setTableData(data));
    dispatch(getResources(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(
      setFilterData({
        title: "",
        categories: [],
        tags: []
      })
    );
    fetchData(newTableData);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-2">
      <ResourceTableSearch ref={inputRef} onSearch={handleSearch} />
      <ResourceFilter />
      <Button className="max-w-md mb-4" size="sm" onClick={onClearAll}>
        Clear All
      </Button>
      <Link to="/resource-new">
        <Button
          className="max-w-md mb-4"
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
        >
          Add Resource
        </Button>
      </Link>
    </div>
  );
};

export default ResourceTableTools;
