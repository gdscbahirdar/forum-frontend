import React, { useRef } from "react";
import { Button, Drawer } from "components/ui";
import TeacherEditContent from "./TeacherEditContent";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerClose, setSelectedTeacher } from "../store/stateSlice";

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

const TeacherEditDialog = () => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(state => state.teachers.state.drawerOpen);

  const onDrawerClose = () => {
    dispatch(setDrawerClose());
    dispatch(setSelectedTeacher({}));
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
      <TeacherEditContent ref={formikRef} />
    </Drawer>
  );
};

export default TeacherEditDialog;
