import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteMode,
  setSelectedRow,
  setSelectedRows
} from "../store/stateSlice";
import { deleteNotifications, getNotifications } from "../store/dataSlice";

const NotificationDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const selectedRows = useSelector(
    state => state.notificationList.state.selectedRows
  );
  const selectedRow = useSelector(
    state => state.notificationList.state.selectedRow
  );
  const deleteMode = useSelector(
    state => state.notificationList.state.deleteMode
  );
  const tableData = useSelector(state => state.notificationList.data.tableData);

  const onDialogClose = () => {
    dispatch(setDeleteMode(""));

    if (deleteMode === "single") {
      dispatch(setSelectedRow([]));
    }
  };

  const onDelete = async () => {
    dispatch(setDeleteMode(""));

    if (deleteMode === "single") {
      const result = await deleteNotifications(selectedRow);
      deleteSucceed(result);
      dispatch(setSelectedRow([]));
    }

    if (deleteMode === "batch") {
      const result = await deleteNotifications(selectedRows);
      deleteSucceed(result, selectedRows.length);
      dispatch(setSelectedRows([]));
    }
  };

  const deleteSucceed = (result, notifications) => {
    if (result === 204) {
      dispatch(getNotifications(tableData));
      toast.push(
        <Notification
          title={"Successfully Deleted"}
          type="success"
          duration={2500}
        >
          {deleteMode === "single" && "Notification "}
          {deleteMode === "batch" && `${notifications} notifications `}
          successfully deleted
        </Notification>,
        {
          placement: "top-center"
        }
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={deleteMode === "single" || deleteMode === "batch"}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete product"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this notification? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default NotificationDeleteConfirmation;
