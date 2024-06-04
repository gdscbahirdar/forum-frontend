import React from "react";
import { Button } from "components/ui";
import { HiOutlineTrash } from "react-icons/hi";
import NotificationTableSearch from "./NotificationTableSearch";
import { useSelector, useDispatch } from "react-redux";
import { setDeleteMode } from "../store/stateSlice";

const BatchDeleteButton = () => {
  const dispatch = useDispatch();

  const onBatchDelete = () => {
    dispatch(setDeleteMode("batch"));
  };

  return (
    <Button
      className="mb-4"
      variant="solid"
      color="red-600"
      size="sm"
      icon={<HiOutlineTrash />}
      onClick={onBatchDelete}
    >
      Batch Delete
    </Button>
  );
};

const NotificationsTableTools = () => {
  const selectedRows = useSelector(
    state => state.notificationList.state.selectedRows
  );
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      {selectedRows.length > 0 && <BatchDeleteButton />}
      <NotificationTableSearch />
    </div>
  );
};

export default NotificationsTableTools;
