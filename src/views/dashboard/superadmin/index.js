import React from "react";
import reducer from "./store";
import { injectReducer } from "store/index";
import ForumDashboardHeader from "./components/ForumDashboardHeader";
import ForumDashboardBody from "./components/ForumDashboardBody";

injectReducer("superAdminDashboard", reducer);

const ForumDashboard = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <ForumDashboardHeader />
      <ForumDashboardBody />
    </div>
  );
};

export default ForumDashboard;
