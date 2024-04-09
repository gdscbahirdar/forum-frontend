import React, { useState } from "react";
import { Card, Button, Notification, toast } from "components/ui";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { ConfirmDialog } from "components/shared";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../store/dataSlice";
import { openEditCustomerDetailDialog } from "../store/stateSlice";
import EditCustomerProfile from "./EditCustomerProfile";

const CustomerInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};

const CustomerProfileAction = ({ id }) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDelete = () => {
    setDialogOpen(false);
    dispatch(deleteCustomer({ id }));
    navigate("/students");
    toast.push(
      <Notification title={"Successfully Deleted"} type="success">
        Customer successfully deleted
      </Notification>
    );
  };

  const onEdit = () => {
    dispatch(openEditCustomerDetailDialog());
  };

  return (
    <>
      <Button block icon={<HiOutlineTrash />} onClick={onDialogOpen}>
        Delete
      </Button>
      <Button icon={<HiPencilAlt />} block variant="solid" onClick={onEdit}>
        Edit
      </Button>
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        type="danger"
        title="Delete customer"
        onCancel={onDialogClose}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this customer? All record related to
          this customer will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
      <EditCustomerProfile />
    </>
  );
};

const CustomerProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
          <CustomerInfoField title="First Name" value={data.first_name} />
          <CustomerInfoField title="Middle Name" value={data.middle_name} />
          <CustomerInfoField title="Last Name" value={data.last_name} />
          <CustomerInfoField title="Faculty" value={data.faculty} />
          <CustomerInfoField title="Department" value={data.department} />
          <CustomerInfoField
            title="Year in School"
            value={data.year_in_school}
          />
          <CustomerInfoField
            title="Admission Date"
            value={data.admission_date}
          />
          <CustomerInfoField
            title="Graduation Date"
            value={data.graduation_date}
          />
        </div>
        <div className="mt-4 flex flex-col xl:flex-row gap-2">
          <CustomerProfileAction id={data.id} />
        </div>
      </div>
    </Card>
  );
};

export default CustomerProfile;
