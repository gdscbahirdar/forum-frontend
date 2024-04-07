import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
  HiOutlineHome
} from "react-icons/hi";

const navigationIcon = {
  home: <HiOutlineHome />,
  singleMenu: <HiOutlineViewGridAdd />,
  users: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />
};

export default navigationIcon;
