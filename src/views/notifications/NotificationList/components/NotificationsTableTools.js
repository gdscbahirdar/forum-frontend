import React from "react";
import NotificationTableSearch from "./NotificationTableSearch";
import { useSelector, useDispatch } from "react-redux";
import { setDeleteMode, setSelectedRows } from "../store/stateSlice";
import NotificationActionDropdown from "./NotificationActionDropdown";
import { getNotifications, markAsRead, markAsUnread } from "../store/dataSlice";

const NotificationsTableTools = () => {
  const selectedRows = useSelector(
    state => state.notificationList.state.selectedRows
  );
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.notificationList.data.tableData);

  const onBatchDelete = () => {
    dispatch(setDeleteMode("batch"));
  };

  const onBatchMarkAsRead = async () => {
    await markAsRead(selectedRows);
    dispatch(setSelectedRows([]));
    dispatch(getNotifications(tableData));
  };

  const onBatchMarkAsUnread = async () => {
    await markAsUnread(selectedRows);
    dispatch(setSelectedRows([]));
    dispatch(getNotifications(tableData));
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      {selectedRows.length > 0 && (
        <NotificationActionDropdown
          onBatchDelete={onBatchDelete}
          onBatchMarkAsRead={onBatchMarkAsRead}
          onBatchMarkAsUnread={onBatchMarkAsUnread}
        />
      )}
      <NotificationTableSearch />
    </div>
  );
};

export default NotificationsTableTools;
