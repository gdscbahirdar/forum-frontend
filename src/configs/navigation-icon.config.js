import React from "react";
import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineViewGridAdd,
  HiOutlineHome,
  HiOutlineBookmark,
  HiOutlineUsers,
  HiOutlineTag,
  HiOutlinePlusCircle,
  HiOutlineFolderOpen
} from "react-icons/hi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { VscFeedback } from "react-icons/vsc";

const navigationIcon = {
  home: <HiOutlineHome />,
  singleMenu: <HiOutlineViewGridAdd />,
  users: <HiOutlineUsers />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
  save: <HiOutlineBookmark />,
  tags: <HiOutlineTag />,
  questions: <HiOutlinePlusCircle />,
  feedback: <VscFeedback />,
  resource: <HiOutlineFolderOpen />,
  leaderboard: <HiOutlineTrophy />
};

export default navigationIcon;
