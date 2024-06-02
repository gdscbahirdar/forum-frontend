import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { useNavigate } from "react-router-dom";
import { deleteResource } from "views/resources/ResourceList/store/dataSlice";

const ResourceDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogOpen = useSelector(
    state => state.resourcesDetail.state.deleteConfirmation
  );
  const selectedResource = useSelector(
    state => state.resourcesDetail.state.selectedResource
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    const status = await deleteResource(selectedResource);

    if (status === 204) {
      navigate("/resource-list");
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
