import React from "react";
import reducer from "./store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import NotificationsTable from "./components/NotificationsTable";
import NotificationsTableTools from "./components/NotificationsTableTools";
import NotificationDeleteConfirmation from "./components/NotificationDeleteConfirmation";

injectReducer("notificationList", reducer);

const NotificationList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Notifications</h3>
        <NotificationsTableTools />
      </div>
      <NotificationsTable />
      <NotificationDeleteConfirmation />
    </AdaptableCard>
  );
};

export default NotificationList;
