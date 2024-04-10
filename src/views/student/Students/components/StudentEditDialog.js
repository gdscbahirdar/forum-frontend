import React, { useRef } from "react";
import { Button, Drawer } from "components/ui";
import StudentEditContent from "./StudentEditContent";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerClose, setSelectedStudent } from "../store/stateSlice";

const DrawerFooter = ({ onSaveClick, onCancel }) => {
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

const StudentEditDialog = () => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(state => state.students.state.drawerOpen);

  const onDrawerClose = () => {
    dispatch(setDrawerClose());
    dispatch(setSelectedStudent({}));
  };

  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Drawer
      isOpen={drawerOpen}
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
      closable={false}
      bodyClass="p-0"
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
    >
      <StudentEditContent ref={formikRef} />
    </Drawer>
  );
};

export default StudentEditDialog;
