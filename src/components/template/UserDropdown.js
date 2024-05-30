import React from "react";
import { Avatar, Dropdown } from "components/ui";
import withHeaderItem from "utils/hoc/withHeaderItem";
import useAuth from "utils/hooks/useAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";

const dropdownItemList = [
  {
    label: "Profile",
    path: "/forum/account/settings/profile",
    icon: <HiOutlineUser />
  }
];

export const UserDropdown = ({ className }) => {
  const userInfo = useSelector(state => state.auth.user);
  const { gold_badges, silver_badges, bronze_badges } = userInfo?.badges;

  const { signOut } = useAuth();

  const UserAvatar = (
    <div className={classNames(className, "flex items-center gap-2")}>
      <Avatar
        size={32}
        shape="circle"
        icon={<HiOutlineUser />}
        src={userInfo.avatar}
      />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{userInfo.authority[0]}</div>
        <div className="font-bold">{userInfo.full_name}</div>
        <div className="flex gap-4">
          <div
            className="font-mono text-gray-400"
            style={{ fontSize: "12px" }}
            title={`Your reputation: ${userInfo.reputation}`}
          >
            {userInfo.reputation}
          </div>
          <div
            className="flex items-center gap-3 font-mono text-gray-400"
            style={{ fontSize: "12px" }}
          >
            {gold_badges > 0 && (
              <span
                className="flex items-center"
                title={`Gold badges: ${gold_badges}`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-300 mr-1"></span>
                {gold_badges}
              </span>
            )}
            {silver_badges > 0 && (
              <span
                className="flex items-center"
                title={`Silver badges: ${silver_badges}`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300 mr-1"></span>
                {silver_badges}
              </span>
            )}
            {bronze_badges > 0 && (
              <span
                className="flex items-center"
                title={`Bronze badges: ${bronze_badges}`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-300 mr-1"></span>
                {bronze_badges}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            <Avatar
              shape="circle"
              icon={<HiOutlineUser />}
              src={userInfo.avatar}
            />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100 capitalize">
                {userInfo.full_name}
              </div>
              <div className="text-xs">{userInfo.username}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map(item => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1"
          >
            <Link className="flex gap-2 items-center" to={item.path}>
              <span className="text-xl opacity-50">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </Dropdown.Item>
        ))}
        {/* <Dropdown.Item variant="divider" /> */}
        <Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default withHeaderItem(UserDropdown);
