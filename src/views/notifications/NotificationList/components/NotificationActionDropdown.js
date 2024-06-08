import React from "react";
import { Dropdown } from "components/ui";

import EllipsisButton from "components/shared/EllipsisButton";
import { CiRead, CiUnread } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi";

const NotificationActionDropdown = ({
  onBatchDelete,
  onBatchMarkAsRead,
  onBatchMarkAsUnread
}) => {
  return (
    <Dropdown
      placement="bottom-end"
      renderTitle={
        <div className="border border-gray-300 mb-4 rounded-md">
          <EllipsisButton shape="none" size="sm" />
        </div>
      }
    >
      <Dropdown.Item onClick={onBatchMarkAsRead} eventKey="markAsRead">
        <span className="text-lg">
          <CiRead />
        </span>
        <span className="ml-2 rtl:mr-2">Mark as Read</span>
      </Dropdown.Item>
      <Dropdown.Item onClick={onBatchMarkAsUnread} eventKey="markAsUnread">
        <span className="text-lg">
          <CiUnread />
        </span>
        <span className="ml-2 rtl:mr-2">Mark as Unread</span>
      </Dropdown.Item>
      <Dropdown.Item onClick={onBatchDelete} eventKey="delete">
        <span className="text-lg">
          <HiOutlineTrash />
        </span>
        <span className="ml-2 rtl:mr-2">Delete</span>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default NotificationActionDropdown;
