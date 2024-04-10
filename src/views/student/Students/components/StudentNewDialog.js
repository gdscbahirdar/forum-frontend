import React, { useRef } from "react";
import { Button, Dialog } from "components/ui";
import StudentNewContent from "./StudentNewContent";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewStudentDialog } from "../store/stateSlice";

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

const StudentNewDialog = () => {
  const dispatch = useDispatch();

  const newStudentDialog = useSelector(
    state => state.students.state.newStudentDialog
  );

  const onDialogClose = () => {
    dispatch(toggleNewStudentDialog(false));
  };

  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog
      width={800}
      isOpen={newStudentDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Create New Student</h5>
      <StudentNewContent ref={formikRef} />
      <DialogFooter onCancel={onDialogClose} onSaveClick={formSubmit} />
    </Dialog>
  );
};

export default StudentNewDialog;
