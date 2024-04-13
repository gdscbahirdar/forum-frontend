import React, { useRef } from "react";
import { Input } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { setSearch } from "../store/stateSlice";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";

const ActionBar = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val) {
    dispatch(setSearch(val));
  }

  const handleInputChange = e => {
    debounceFn(e.target.value);
  };

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">Tags</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-1">
        <Input
          ref={inputRef}
          size="sm"
          placeholder="Search"
          prefix={<HiOutlineSearch className="text-lg" />}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ActionBar;
