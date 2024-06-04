import React, { useRef } from "react";
import { Button, Input } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, setTableData } from "../store/dataSlice";
import cloneDeep from "lodash/cloneDeep";

const NotificationTableSearch = () => {
  const dispatch = useDispatch();

  const searchInput = useRef();

  const tableData = useSelector(state => state.notificationList.data.tableData);

  const handleSearch = () => {
    const query = searchInput.current.value;
    const newTableData = cloneDeep(tableData);
    newTableData.query = query;
    newTableData.pageIndex = 1;
    fetchData(newTableData);
  };

  const fetchData = data => {
    dispatch(setTableData(data));
    dispatch(getNotifications(data));
  };

  const handleSearchClick = () => {
    handleSearch?.();
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch?.();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        ref={searchInput}
        className="max-w-md md:w-52 mb-4"
        size="sm"
        placeholder="Search"
        prefix={<HiOutlineSearch className="text-lg" />}
        onKeyDown={handleKeyDown}
      />
      <Button size="sm" className="max-w-md mb-4" onClick={handleSearchClick}>
        Search
      </Button>
    </div>
  );
};

export default NotificationTableSearch;
