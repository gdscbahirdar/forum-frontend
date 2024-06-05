import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import {
  setUnsubscribeMode,
  setSelectedRow,
  setSelectedRows
} from "../store/stateSlice";
import {
  unsubscribe,
  getNotifications,
  bulkUnsubscribe
} from "../store/dataSlice";

const NotificationUnsubscribeConfirmation = () => {
  const dispatch = useDispatch();
  const selectedRows = useSelector(
    state => state.notificationList.state.selectedRows
  );
  const selectedRow = useSelector(
    state => state.notificationList.state.selectedRow
  );
  const unsubscribeMode = useSelector(
    state => state.notificationList.state.unsubscribeMode
  );
  const tableData = useSelector(state => state.notificationList.data.tableData);

  const onDialogClose = () => {
    dispatch(setUnsubscribeMode(""));

    if (unsubscribeMode === "single") {
      dispatch(setSelectedRow([]));
    }
  };

  const onUnsubscribe = async () => {
    dispatch(setUnsubscribeMode(""));

    if (unsubscribeMode === "single") {
      const result = await unsubscribe(selectedRow);
      unsubscribeSucceed(result);
      dispatch(setSelectedRow([]));
    }

    if (unsubscribeMode === "batch") {
      const result = await bulkUnsubscribe(selectedRows);
      unsubscribeSucceed(result, selectedRows.length);
      dispatch(setSelectedRows([]));
    }
  };

  const unsubscribeSucceed = (result, notifications) => {
    if (result === 204) {
      dispatch(getNotifications(tableData));
      toast.push(
        <Notification
          title={"Successfully Unsubscribed"}
          type="success"
          duration={2500}
        >
          {unsubscribeMode === "single" && "Notification "}
          {unsubscribeMode === "batch" && `${notifications} notifications `}
          successfully unsubscribed. You will no longer receive notifications
          from this content.
        </Notification>,
        {
          placement: "top-center"
        }
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={unsubscribeMode === "single" || unsubscribeMode === "batch"}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Unsubscribe"
      onCancel={onDialogClose}
      onConfirm={onUnsubscribe}
      confirmButtonColor="red-600"
    >
      <p>Are you sure you want to unsubscribe from this notification?</p>
    </ConfirmDialog>
  );
};

export default NotificationUnsubscribeConfirmation;
