import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineViewGridAdd,
  HiOutlineHome,
  HiOutlineBookmark,
  HiOutlineUsers,
  HiOutlineTag,
  HiOutlinePlusCircle
} from "react-icons/hi";
// import { HiOutlineTrophy } from "react-icons/hi2";

const navigationIcon = {
  home: <HiOutlineHome />,
  singleMenu: <HiOutlineViewGridAdd />,
  users: <HiOutlineUsers />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
  save: <HiOutlineBookmark />,
  tags: <HiOutlineTag />,
  questions: <HiOutlinePlusCircle />
};

export default navigationIcon;
