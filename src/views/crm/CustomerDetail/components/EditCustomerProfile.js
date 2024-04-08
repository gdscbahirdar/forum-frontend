import React, { useRef } from "react";
import { Drawer, Button } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { closeEditCustomerDetailDialog } from "../store/stateSlice";
import { updateProfileData, putCustomer } from "../store/dataSlice";
import CustomerForm from "views/crm/CustomerForm";
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

const EditCustomerProfile = () => {
  const dispatch = useDispatch();

  const formikRef = useRef();

  const dialogOpen = useSelector(
    state => state.crmCustomerDetails.state.editCustomerDetailDialog
  );
  const customer = useSelector(
    state => state.crmCustomerDetails.data.profileData
  );

  const onDrawerClose = () => {
    dispatch(closeEditCustomerDetailDialog());
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const onFormSubmit = values => {
    const {
      img,
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

    const newData = {
      img,
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
    dispatch(updateProfileData(newData));
    dispatch(putCustomer(newData));
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
      <CustomerForm
        ref={formikRef}
        onFormSubmit={onFormSubmit}
        customer={customer}
      />
    </Drawer>
  );
};

export default EditCustomerProfile;
