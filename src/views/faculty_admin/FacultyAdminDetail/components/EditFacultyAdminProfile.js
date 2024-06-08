import React, { useRef } from "react";
import { Drawer, Button } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { closeEditFacultyAdminDetailDialog } from "../store/stateSlice";
import { updateProfileData, putFacultyAdmin } from "../store/dataSlice";
import FacultyAdminForm from "views/faculty_admin/FacultyAdminForm";

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

const EditFacultyAdminProfile = () => {
  const dispatch = useDispatch();

  const formikRef = useRef();

  const dialogOpen = useSelector(
    state => state.facultyAdminDetails.state.editFacultyAdminDetailDialog
  );
  const faculty_admin = useSelector(
    state => state.facultyAdminDetails.data.profileData
  );

  const onDrawerClose = () => {
    dispatch(closeEditFacultyAdminDetailDialog());
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const onFormSubmit = values => {
    const { username, first_name, middle_name, last_name, gender, faculty } =
      values;

    const newData = {
      username,
      first_name,
      middle_name,
      last_name,
      gender,
      faculty
    };
    dispatch(updateProfileData(newData));
    dispatch(putFacultyAdmin(newData));
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
      <FacultyAdminForm
        ref={formikRef}
        onFormSubmit={onFormSubmit}
        faculty_admin={faculty_admin}
      />
    </Drawer>
  );
};

export default EditFacultyAdminProfile;
