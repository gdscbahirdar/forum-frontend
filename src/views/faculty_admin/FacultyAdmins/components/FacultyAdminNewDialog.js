import React, { useRef } from "react";
import { Button, Dialog } from "components/ui";
import FacultyAdminNewContent from "./FacultyAdminNewContent";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewFacultyAdminDialog } from "../store/stateSlice";

const DialogFooter = ({ onSaveClick, onCancel }) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
};

const FacultyAdminNewDialog = () => {
  const dispatch = useDispatch();

  const newFacultyAdminDialog = useSelector(
    state => state.faculty_admins.state.newFacultyAdminDialog
  );

  const onDialogClose = () => {
    dispatch(toggleNewFacultyAdminDialog(false));
  };

  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog
      width={800}
      isOpen={newFacultyAdminDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Create New Faculty Admin</h5>
      <FacultyAdminNewContent ref={formikRef} />
      <DialogFooter onCancel={onDialogClose} onSaveClick={formSubmit} />
    </Dialog>
  );
};

export default FacultyAdminNewDialog;
