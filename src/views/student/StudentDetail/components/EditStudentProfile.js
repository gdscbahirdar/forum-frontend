import React, { useRef } from "react";
import { Drawer, Button } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { closeEditStudentDetailDialog } from "../store/stateSlice";
import { updateProfileData, putStudent } from "../store/dataSlice";
import StudentForm from "views/student/StudentForm";
import dayjs from "dayjs";

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

const EditStudentProfile = () => {
  const dispatch = useDispatch();

  const formikRef = useRef();

  const dialogOpen = useSelector(
    state => state.studentStudentDetails.state.editStudentDetailDialog
  );
  const student = useSelector(
    state => state.studentStudentDetails.data.profileData
  );

  const onDrawerClose = () => {
    dispatch(closeEditStudentDetailDialog());
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
      faculty,
      department,
      gender,
      year_in_school,
      admission_date,
      graduation_date
    } = values;

    const newData = {
      username,
      first_name,
      middle_name,
      last_name,
      faculty,
      department,
      gender,
      year_in_school,
      admission_date: dayjs(admission_date).format("YYYY/MM/DD"),
      graduation_date: dayjs(graduation_date).format("YYYY/MM/DD")
    };
    dispatch(updateProfileData(newData));
    dispatch(putStudent(newData));
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
      <StudentForm
        ref={formikRef}
        onFormSubmit={onFormSubmit}
        student={student}
      />
    </Drawer>
  );
};

export default EditStudentProfile;
