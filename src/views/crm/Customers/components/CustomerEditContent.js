import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putCustomer } from "../store/dataSlice";
import { setDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import CustomerForm from "views/crm/CustomerForm";
import dayjs from "dayjs";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, Notification } from "components/ui";

const CustomerEditContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const student = useSelector(
    state => state.crmCustomers.state.selectedCustomer
  );
  const data = useSelector(state => state.crmCustomers.data.customerList);
  const { id } = student;

  const onFormSubmit = values => {
    const {
      username,
      first_name,
      middle_name,
      last_name,
      faculty,
      department,
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
      year_in_school,
      admission_date: dayjs(admission_date).format("YYYY-MM-DD"),
      graduation_date: dayjs(graduation_date).format("YYYY-MM-DD")
    };
    let newData = cloneDeep(data);
    let editedCustomer = {};
    newData.map(elm => {
      if (elm.id === id) {
        elm = { ...elm, ...info };
        editedCustomer = elm;
      }
      return elm;
    });
    editedCustomer = {
      username: editedCustomer.username,
      first_name: editedCustomer.first_name,
      middle_name: editedCustomer.middle_name,
      last_name: editedCustomer.last_name,
      student: {
        faculty: editedCustomer.faculty,
        department: editedCustomer.department,
        year_in_school: editedCustomer.year_in_school,
        admission_date: dayjs(admission_date).format("YYYY-MM-DD"),
        graduation_date: dayjs(graduation_date).format("YYYY-MM-DD")
      }
    };
    if (!isEmpty(editedCustomer)) {
      dispatch(putCustomer({ id, editedCustomer }))
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
              const errorMessage = errors[key][0];
              toast.push(
                <Notification title="Failure" type="danger">
                  Failed to update student: {errorMessage}
                </Notification>
              );
            });
          }
        });
    }
  };

  return (
    <CustomerForm ref={ref} onFormSubmit={onFormSubmit} student={student} />
  );
});

export default CustomerEditContent;
