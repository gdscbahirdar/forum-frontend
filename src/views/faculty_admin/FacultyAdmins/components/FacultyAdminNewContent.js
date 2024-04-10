import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { createFacultyAdmin } from "../store/dataSlice";
import { toggleNewFacultyAdminDialog } from "../store/stateSlice";
import isEmpty from "lodash/isEmpty";
import FacultyAdminForm from "views/faculty_admin/FacultyAdminForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const FacultyAdminNewContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const onFormSubmit = values => {
    const { username, first_name, middle_name, last_name, faculty } = values;
    const newFacultyAdmin = {
      username: username,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      faculty_admin: {
        faculty: faculty
      }
    };

    if (!isEmpty(newFacultyAdmin)) {
      dispatch(createFacultyAdmin(newFacultyAdmin))
        .then(unwrapResult)
        .then(result => {
          if (result.success) {
            toast.push(
              <Notification title="Success" type="success">
                FacultyAdmin created successfully
              </Notification>
            );
            dispatch(toggleNewFacultyAdminDialog(false));
            window.location.reload();
          } else {
            const errors = result.response;
            Object.keys(errors).forEach(key => {
              const errorMessage = errors[key][0];
              toast.push(
                <Notification title="Failure" type="danger">
                  Failed to create faculty_admin: {errorMessage}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <>
      <FacultyAdminForm ref={ref} onFormSubmit={onFormSubmit} modal={true} />;
    </>
  );
});

export default FacultyAdminNewContent;
