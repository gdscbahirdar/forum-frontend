import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { createTeacher } from "../store/dataSlice";
import { toggleNewTeacherDialog } from "../store/stateSlice";
import isEmpty from "lodash/isEmpty";
import TeacherForm from "views/teacher/TeacherForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const TeacherNewContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

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
    const newTeacher = {
      username: username,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      gender,
      teacher: {
        faculty: faculty,
        departments: departments
      }
    };

    if (!isEmpty(newTeacher)) {
      dispatch(createTeacher(newTeacher))
        .then(unwrapResult)
        .then(result => {
          if (result.success) {
            toast.push(
              <Notification title="Success" type="success">
                Teacher created successfully
              </Notification>
            );
            dispatch(toggleNewTeacherDialog(false));
            window.location.reload();
          } else {
            const errors = result.response;
            Object.keys(errors).forEach(key => {
              const error = errors[key];
              toast.push(
                <Notification title="Failure" type="danger">
                  Failed to create teacher: {Object.values(error).join(", ")}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <>
      <TeacherForm ref={ref} onFormSubmit={onFormSubmit} modal={true} />;
    </>
  );
});

export default TeacherNewContent;
