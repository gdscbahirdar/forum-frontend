import React, { useState } from "react";
import { Card, Button, Notification, toast } from "components/ui";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { ConfirmDialog } from "components/shared";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../store/dataSlice";
import { openEditStudentDetailDialog } from "../store/stateSlice";
import EditStudentProfile from "./EditStudentProfile";

const StudentInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};

const StudentProfileAction = ({ id }) => {
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
    dispatch(deleteStudent(id));
    navigate("/students");
    toast.push(
      <Notification title={"Successfully Deleted"} type="success">
        Student successfully deleted
      </Notification>
    );
  };

  const onEdit = () => {
    dispatch(openEditStudentDetailDialog());
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
        title="Delete student"
        onCancel={onDialogClose}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this student? All record related to
          this student will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
      <EditStudentProfile />
    </>
  );
};

const StudentProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
          <StudentInfoField title="Username" value={data.username} />
          <StudentInfoField title="First Name" value={data.first_name} />
          <StudentInfoField title="Middle Name" value={data.middle_name} />
          <StudentInfoField title="Gender" value={data.gender} />
          <StudentInfoField title="Last Name" value={data.last_name} />
          <StudentInfoField title="Faculty" value={data.faculty} />
          <StudentInfoField title="Department" value={data.department} />
          <StudentInfoField
            title="Year in School"
            value={data.year_in_school}
          />
          <StudentInfoField
            title="Admission Date"
            value={data.admission_date}
          />
          <StudentInfoField
            title="Graduation Date"
            value={data.graduation_date}
          />
        </div>
        <div className="mt-4 flex flex-col xl:flex-row gap-2">
          <StudentProfileAction id={data.id} />
        </div>
      </div>
    </Card>
  );
};

export default StudentProfile;
