import React, { useRef } from "react";
import { Button, Dialog } from "components/ui";
import TeacherNewContent from "./TeacherNewContent";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewTeacherDialog } from "../store/stateSlice";

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

const TeacherNewDialog = () => {
  const dispatch = useDispatch();

  const newTeacherDialog = useSelector(
    state => state.teachers.state.newTeacherDialog
  );

  const onDialogClose = () => {
    dispatch(toggleNewTeacherDialog(false));
  };

  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog
      width={800}
      isOpen={newTeacherDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Create New Teacher</h5>
      <TeacherNewContent ref={formikRef} />
      <DialogFooter onCancel={onDialogClose} onSaveClick={formSubmit} />
    </Dialog>
  );
};

export default TeacherNewDialog;
