import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM
} from "constants/navigation.constant";
import { FACULTY_ADMIN, SUPER_ADMIN } from "constants/roles.constant";

const navigationConfig = [
  {
    key: "home",
    path: "/home",
    title: "Home",
    translateKey: "nav.home",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: []
  },
  {
    key: "questions",
    path: "/questions",
    title: "Questions",
    translateKey: "nav.questions",
    icon: "questions",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: []
  },
  {
    key: "tags",
    path: "/tags",
    title: "Tags",
    translateKey: "nav.tags",
    icon: "tags",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: []
  },
  {
    key: "users",
    path: "",
    title: "Users",
    translateKey: "nav.users.users",
    icon: "users",
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [SUPER_ADMIN, FACULTY_ADMIN],
    subMenu: [
      {
        key: "users.students",
        path: "/students",
        title: "Students",
        translateKey: "nav.users.students",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, FACULTY_ADMIN],
        subMenu: []
      },
      {
        key: "users.teachers",
        path: "/teachers",
        title: "Teachers",
        translateKey: "nav.users.teachers",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, FACULTY_ADMIN],
        subMenu: []
      },
      {
        key: "users.faculty_admin",
        path: "/faculty_admins",
        title: "Faculty Admins",
        translateKey: "nav.users.faculty_admins",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN],
        subMenu: []
      }
    ]
  },
  {
    key: "resources",
    path: "",
    title: "Resources",
    translateKey: "nav.resources.resources",
    icon: "resource",
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
      {
        key: "resources.resourceList",
        path: `/resource-list`,
        title: "Resource List",
        translateKey: "nav.resources.resourceList",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
      },
      {
        key: "resources.resourceNew",
        path: `/resource-new`,
        title: "New Resource",
        translateKey: "nav.resources.resourceNew",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
      },
      {
        key: "resources.myUploads",
        path: `/my-uploads`,
        title: "My Uploads",
        translateKey: "nav.resources.myUploads",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
      }
    ]
  },
  {
    key: "others",
    path: "",
    title: "Others",
    translateKey: "nav.others.others",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [],
    subMenu: [
      {
        key: "others.saves",
        path: "/saves",
        title: "Saves",
        translateKey: "nav.others.saves",
        icon: "save",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
      }
      // {
      //   key: "others.reputations",
      //   path: "/reputations",
      //   title: "Reputations",
      //   translateKey: "nav.others.reputations",
      //   icon: "groupSingleMenu",
      //   type: NAV_ITEM_TYPE_ITEM,
      //   authority: [],
      //   subMenu: []
      // }
      // {
      //   key: "others.collapse",
      //   path: "",
      //   title: "Group collapse menu",
      //   translateKey: "nav.others.collapse.collapse",
      //   icon: "groupCollapseMenu",
      //   type: NAV_ITEM_TYPE_COLLAPSE,
      //   authority: [],
      //   subMenu: [
      //     {
      //       key: "others.collapse.item1",
      //       path: "/group-collapse-menu-item-view-1",
      //       title: "Menu item 1",
      //       translateKey: "nav.others.collapse.item1",
      //       icon: "",
      //       type: NAV_ITEM_TYPE_ITEM,
      //       authority: [],
      //       subMenu: []
      //     },
      //     {
      //       key: "others.collapse.item2",
      //       path: "/group-collapse-menu-item-view-2",
      //       title: "Menu item 2",
      //       translateKey: "nav.others.collapse.item2",
      //       icon: "",
      //       type: NAV_ITEM_TYPE_ITEM,
      //       authority: [],
      //       subMenu: []
      //     }
      //   ]
      // }
    ]
  },
  {
    key: "feedback",
    path: "/feedback",
    title: "Feedback",
    translateKey: "nav.feedback",
    icon: "feedback",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: []
  },
  {
    key: "leaderboard",
    path: "/leaderboard",
    title: "Leader Board",
    translateKey: "nav.leaderboard",
    icon: "leaderboard",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: []
  }
];

export default navigationConfig;
