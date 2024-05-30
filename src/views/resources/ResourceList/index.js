import React from "react";
import reducer from "./store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ResourceTable from "./components/ResourceTable";
import ResourceTableTools from "./components/ResourceTableTools";

injectReducer("resources", reducer);

const ResourceList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Resources</h3>
        <ResourceTableTools />
      </div>
      <ResourceTable />
    </AdaptableCard>
  );
};

export default ResourceList;
