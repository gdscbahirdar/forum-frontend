import React from "react";
import { injectReducer } from "store/index";
import ActivitySidebar from "./activity_components/ActivitySidebar";
import reducer from "../store";
import ActivityBody from "./activity_components/ActivityBody";
import { AdaptableCard } from "components/shared";

injectReducer("settings", reducer);

const Activity = ({ activityPath }) => {
  return (
    <AdaptableCard
      className="h-full overflow-hidden"
      bodyClass="p-0 h-full inset-0 flex min-w-0 overflow-hidden"
    >
      <ActivitySidebar activityPath={activityPath} />
      <ActivityBody />
    </AdaptableCard>
  );
};

export default Activity;
