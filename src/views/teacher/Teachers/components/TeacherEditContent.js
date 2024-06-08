import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putTeacher } from "../store/dataSlice";
import { setDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import TeacherForm from "views/teacher/TeacherForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const TeacherEditContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const teacher = useSelector(state => state.teachers.state.selectedTeacher);
  const data = useSelector(state => state.teachers.data.teacherList);
  const { id } = teacher;

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
    const info = {
      username,
      first_name,
      middle_name,
      last_name,
      gender,
      faculty,
      departments
    };
    let newData = cloneDeep(data);
    let editedTeacher = {};
    newData.map(elm => {
      if (elm.id === id) {
        elm = { ...elm, ...info };
        editedTeacher = elm;
      }
      return elm;
    });
    editedTeacher = {
      username: editedTeacher.username,
      first_name: editedTeacher.first_name,
      middle_name: editedTeacher.middle_name,
      last_name: editedTeacher.last_name,
      gender: editedTeacher.gender,
      teacher: {
        faculty: editedTeacher.faculty,
        departments: editedTeacher.departments
      }
    };
    if (!isEmpty(editedTeacher)) {
      dispatch(putTeacher({ id, editedTeacher }))
        .then(unwrapResult)
        .then(result => {
          if (result.success) {
            toast.push(
              <Notification title="Success" type="success">
                Teacher updated successfully
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
                  Failed to update teacher: {Object.values(error).join(", ")}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <TeacherForm ref={ref} onFormSubmit={onFormSubmit} teacher={teacher} />
  );
});

export default TeacherEditContent;
