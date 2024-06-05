import React, { useRef } from "react";
import { Drawer, Button } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { closeEditTeacherDetailDialog } from "../store/stateSlice";
import { updateProfileData, putTeacher } from "../store/dataSlice";
import TeacherForm from "views/teacher/TeacherForm";

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

const EditTeacherProfile = () => {
  const dispatch = useDispatch();

  const formikRef = useRef();

  const dialogOpen = useSelector(
    state => state.teacherTeacherDetails.state.editTeacherDetailDialog
  );
  const teacher = useSelector(
    state => state.teacherTeacherDetails.data.profileData
  );

  const onDrawerClose = () => {
    dispatch(closeEditTeacherDetailDialog());
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const onFormSubmit = values => {
    const {
      username,
      first_name,
      middle_name,
      last_name,
      gender,
      faculty,
      departments
    } = values;

    const newData = {
      username,
      first_name,
      middle_name,
      last_name,
      gender,
      faculty,
      departments
    };
    dispatch(updateProfileData(newData));
    dispatch(putTeacher(newData));
    onDrawerClose();
  };

  return (
    <Drawer
      isOpen={dialogOpen}
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
      closable={false}
      bodyClass="p-0"
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
    >
      <TeacherForm
        ref={formikRef}
        onFormSubmit={onFormSubmit}
        teacher={teacher}
      />
    </Drawer>
  );
};

export default EditTeacherProfile;
