import React, { forwardRef } from "react";
import { Input, Button } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";

const StudentTableSearch = forwardRef((props, ref) => {
  const { onSearch } = props;

  const handleSearchClick = () => {
    onSearch?.();
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        ref={ref}
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
});

export default StudentTableSearch;
