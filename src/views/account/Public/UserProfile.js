import React from "react";
import { Card, Avatar } from "components/ui";
import { HiOutlineUser } from "react-icons/hi";

const UserInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};

const UserProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="flex xl:flex-col items-center gap-4">
          <Avatar
            size={90}
            shape="circle"
            icon={<HiOutlineUser />}
            src={data.avatar}
          />
          <h4 className="font-bold">
            {data.first_name} {data.middle_name} {data.last_name}
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
          <UserInfoField title="Username" value={data.username} />
          <UserInfoField title="Faculty" value={data.faculty || "-"} />
          <UserInfoField title="Bio" value={data.bio || "-"} />
          <UserInfoField title="Reputation" value={data.reputation} />
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
