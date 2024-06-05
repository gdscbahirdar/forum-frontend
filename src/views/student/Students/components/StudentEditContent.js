import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putStudent } from "../store/dataSlice";
import { setDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import StudentForm from "views/student/StudentForm";
import dayjs from "dayjs";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const StudentEditContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const student = useSelector(state => state.students.state.selectedStudent);
  const data = useSelector(state => state.students.data.studentList);
  const { id } = student;

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
    const info = {
      username,
      first_name,
      middle_name,
      last_name,
      faculty,
      department,
      gender,
      year_in_school,
      admission_date: dayjs(admission_date).format("YYYY-MM-DD"),
      graduation_date: dayjs(graduation_date).format("YYYY-MM-DD")
    };
    let newData = cloneDeep(data);
    let editedStudent = {};
    newData.map(elm => {
      if (elm.id === id) {
        elm = { ...elm, ...info };
        editedStudent = elm;
      }
      return elm;
    });
    editedStudent = {
      username: editedStudent.username,
      first_name: editedStudent.first_name,
      middle_name: editedStudent.middle_name,
      last_name: editedStudent.last_name,
      gender: editedStudent.gender,
      student: {
        faculty: editedStudent.faculty,
        department: editedStudent.department,
        year_in_school: editedStudent.year_in_school,
        admission_date: dayjs(admission_date).format("YYYY-MM-DD"),
        graduation_date: dayjs(graduation_date).format("YYYY-MM-DD")
      }
    };
    if (!isEmpty(editedStudent)) {
      dispatch(putStudent({ id, editedStudent }))
        .then(unwrapResult)
        .then(result => {
          if (result.success) {
            toast.push(
              <Notification title="Success" type="success">
                Student updated successfully
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
                  Failed to update student: {Object.values(error).join(", ")}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <StudentForm ref={ref} onFormSubmit={onFormSubmit} student={student} />
  );
});

export default StudentEditContent;
