import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerList, putCustomer } from "../store/dataSlice";
import { setDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import CustomerForm from "views/crm/CustomerForm";
import dayjs from "dayjs";

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
      admission_date: dayjs(admission_date).format("YYYY/MM/DD"),
      graduation_date: dayjs(graduation_date).format("YYYY/MM/DD")
    };
    let newData = cloneDeep(data);
    let editedCustomer = {};
    newData = newData.map(elm => {
      if (elm.id === id) {
        elm = { ...elm, ...info };
        editedCustomer = elm;
      }
      return elm;
    });
    if (!isEmpty(editedCustomer)) {
      dispatch(putCustomer(editedCustomer));
    }
    dispatch(setDrawerClose());
    dispatch(setCustomerList(newData));
  };

  return (
    <CustomerForm ref={ref} onFormSubmit={onFormSubmit} student={student} />
  );
});

export default CustomerEditContent;
