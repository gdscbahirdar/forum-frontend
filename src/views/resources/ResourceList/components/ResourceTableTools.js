import React from "react";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import ResourceTableSearch from "./ResourceTableSearch";
import ResourceFilter from "./ResourceFilter";
import { Link } from "react-router-dom";

const ResourceTableTools = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-center">
      <ResourceTableSearch />
      <ResourceFilter />
      <Link className="block lg:inline-block md:mb-0 mb-4" to="/resource-new">
        <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
          Add Resource
        </Button>
      </Link>
    </div>
  );
};

export default ResourceTableTools;
