import React from "react";
import ActivitySidebar from "./ActivitySidebar";
import ActivityBody from "./ActivityBody";
import { AdaptableCard } from "components/shared";

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
