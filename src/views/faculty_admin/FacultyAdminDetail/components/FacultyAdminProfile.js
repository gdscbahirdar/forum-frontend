import React, { useState } from "react";
import { Card, Button, Notification, toast } from "components/ui";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { ConfirmDialog } from "components/shared";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFacultyAdmin } from "../store/dataSlice";
import { openEditFacultyAdminDetailDialog } from "../store/stateSlice";
import EditFacultyAdminProfile from "./EditFacultyAdminProfile";

const FacultyAdminInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};

const FacultyAdminProfileAction = ({ id }) => {
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
    dispatch(deleteFacultyAdmin(id));
    navigate("/faculty_admins");
    toast.push(
      <Notification title={"Successfully Deleted"} type="success">
        FacultyAdmin successfully deleted
      </Notification>
    );
  };

  const onEdit = () => {
    dispatch(openEditFacultyAdminDetailDialog());
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
        title="Delete faculty_admin"
        onCancel={onDialogClose}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this faculty_admin? All record related
          to this faculty_admin will be deleted as well. This action cannot be
          undone.
        </p>
      </ConfirmDialog>
      <EditFacultyAdminProfile />
    </>
  );
};

const FacultyAdminProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
          <FacultyAdminInfoField title="Username" value={data.username} />
          <FacultyAdminInfoField title="First Name" value={data.first_name} />
          <FacultyAdminInfoField title="Middle Name" value={data.middle_name} />
          <FacultyAdminInfoField title="Last Name" value={data.last_name} />
          <FacultyAdminInfoField title="Gender" value={data.gender} />
          <FacultyAdminInfoField title="Faculty" value={data.faculty} />
        </div>
        <div className="mt-4 flex flex-col xl:flex-row gap-2">
          <FacultyAdminProfileAction id={data.id} />
        </div>
      </div>
    </Card>
  );
};

export default FacultyAdminProfile;
