import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../store/dataSlice";
import { toggleNewStudentDialog } from "../store/stateSlice";
import isEmpty from "lodash/isEmpty";
import StudentForm from "views/student/StudentForm";
import dayjs from "dayjs";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const StudentNewContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

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
    const newStudent = {
      username: username,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      gender: gender,
      student: {
        faculty: faculty,
        department: department,
        year_in_school: year_in_school,
        admission_date: dayjs(admission_date).format("YYYY-MM-DD"),
        graduation_date: dayjs(graduation_date).format("YYYY-MM-DD")
      }
    };

    if (!isEmpty(newStudent)) {
      dispatch(createStudent(newStudent))
        .then(unwrapResult)
        .then(result => {
          if (result.success) {
            toast.push(
              <Notification title="Success" type="success">
                Student created successfully
              </Notification>
            );
            dispatch(toggleNewStudentDialog(false));
            window.location.reload();
          } else {
            const errors = result.response;
            Object.keys(errors).forEach(key => {
              const error = errors[key];
              toast.push(
                <Notification title="Failure" type="danger">
                  Failed to create student: {Object.values(error).join(", ")}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <>
      <StudentForm ref={ref} onFormSubmit={onFormSubmit} modal={true} />;
    </>
  );
});

export default StudentNewContent;
