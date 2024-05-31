import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { deleteResource, getResources } from "../store/dataSlice";

const ResourceDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    state => state.resources.state.deleteConfirmation
  );
  const selectedResource = useSelector(
    state => state.resources.state.selectedResource
  );
  const tableData = useSelector(state => state.resources.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    const status = await deleteResource(selectedResource);

    if (status === 204) {
      dispatch(getResources(tableData));
      toast.push(
        <Notification
          title={"Successfuly Deleted"}
          type="success"
          duration={2500}
        >
          Resource successfuly deleted
        </Notification>,
        {
          placement: "top-center"
        }
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete resource"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this resource? All record related to
        this resource will be deleted as well. This action cannot be undone.
      </p>
    </ConfirmDialog>
  );
};

export default ResourceDeleteConfirmation;
