import React, { useState } from "react";
import { Card, Button, Notification, toast } from "components/ui";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { ConfirmDialog } from "components/shared";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTeacher } from "../store/dataSlice";
import { openEditTeacherDetailDialog } from "../store/stateSlice";
import EditTeacherProfile from "./EditTeacherProfile";

const TeacherInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};

const TeacherProfileAction = ({ id }) => {
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
    dispatch(deleteTeacher(id));
    navigate("/teachers");
    toast.push(
      <Notification title={"Successfully Deleted"} type="success">
        Teacher successfully deleted
      </Notification>
    );
  };

  const onEdit = () => {
    dispatch(openEditTeacherDetailDialog());
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
        title="Delete teacher"
        onCancel={onDialogClose}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this teacher? All record related to
          this teacher will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
      <EditTeacherProfile />
    </>
  );
};

const TeacherProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
          <TeacherInfoField title="Username" value={data.username} />
          <TeacherInfoField title="First Name" value={data.first_name} />
          <TeacherInfoField title="Middle Name" value={data.middle_name} />
          <TeacherInfoField title="Last Name" value={data.last_name} />
          <TeacherInfoField title="Gender" value={data.gender} />
          <TeacherInfoField title="Faculty" value={data.faculty} />
          <TeacherInfoField
            title="Departments"
            value={data.departments.join(", ")}
          />
        </div>
        <div className="mt-4 flex flex-col xl:flex-row gap-2">
          <TeacherProfileAction id={data.id} />
        </div>
      </div>
    </Card>
  );
};

export default TeacherProfile;
