import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putFacultyAdmin } from "../store/dataSlice";
import { setDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import FacultyAdminForm from "views/faculty_admin/FacultyAdminForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const FacultyAdminEditContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const faculty_admin = useSelector(
    state => state.faculty_admins.state.selectedFacultyAdmin
  );
  const data = useSelector(state => state.faculty_admins.data.facultyAdminList);
  const { id } = faculty_admin;

  const onFormSubmit = values => {
    const { username, first_name, middle_name, last_name, gender, faculty } =
      values;
    const info = {
      username,
      first_name,
      middle_name,
      last_name,
      gender,
      faculty
    };
    let newData = cloneDeep(data);
    let editedFacultyAdmin = {};
    newData.map(elm => {
      if (elm.id === id) {
        elm = { ...elm, ...info };
        editedFacultyAdmin = elm;
      }
      return elm;
    });
    editedFacultyAdmin = {
      username: editedFacultyAdmin.username,
      first_name: editedFacultyAdmin.first_name,
      middle_name: editedFacultyAdmin.middle_name,
      last_name: editedFacultyAdmin.last_name,
      gender: editedFacultyAdmin.gender,
      faculty_admin: {
        faculty: editedFacultyAdmin.faculty
      }
    };
    if (!isEmpty(editedFacultyAdmin)) {
      dispatch(putFacultyAdmin({ id, editedFacultyAdmin }))
        .then(unwrapResult)
        .then(result => {
          if (result.success) {
            toast.push(
              <Notification title="Success" type="success">
                FacultyAdmin updated successfully
              </Notification>
            );
            dispatch(setDrawerClose());
            window.location.reload();
          } else {
            const errors = result.response;
            Object.keys(errors).forEach(key => {
              const error = errors[key];
              toast.push(
                <Notification title="Failure" type="danger">
                  Failed to update faculty admin:{" "}
                  {Object.values(error).join(", ")}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <FacultyAdminForm
      ref={ref}
      onFormSubmit={onFormSubmit}
      faculty_admin={faculty_admin}
    />
  );
});

export default FacultyAdminEditContent;
