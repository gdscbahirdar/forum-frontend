import React, { useRef } from "react";
import { Button, Dialog } from "components/ui";
import CustomerNewContent from "./CustomerNewContent";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewCustomerDialog } from "../store/stateSlice";

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

const CustomerNewDialog = () => {
  const dispatch = useDispatch();

  const newCustomerDialog = useSelector(
    state => state.crmCustomers.state.newCustomerDialog
  );

  const onDialogClose = () => {
    dispatch(toggleNewCustomerDialog(false));
  };

  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog
      width={800}
      isOpen={newCustomerDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Create New Student</h5>
      <CustomerNewContent ref={formikRef} />
      <DialogFooter onCancel={onDialogClose} onSaveClick={formSubmit} />
    </Dialog>
  );
};

export default CustomerNewDialog;
