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
    key: "groupMenu",
    path: "",
    title: "Group Menu",
    translateKey: "nav.groupMenu.groupMenu",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [],
    subMenu: [
      {
        key: "groupMenu.saves",
        path: "/saves",
        title: "Saves",
        translateKey: "nav.groupMenu.saves",
        icon: "save",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
      },
      {
        key: "groupMenu.reputations",
        path: "/reputations",
        title: "Reputations",
        translateKey: "nav.groupMenu.reputations",
        icon: "groupSingleMenu",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
      },
      {
        key: "groupMenu.collapse",
        path: "",
        title: "Group collapse menu",
        translateKey: "nav.groupMenu.collapse.collapse",
        icon: "groupCollapseMenu",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: "groupMenu.collapse.item1",
            path: "/group-collapse-menu-item-view-1",
            title: "Menu item 1",
            translateKey: "nav.groupMenu.collapse.item1",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: []
          },
          {
            key: "groupMenu.collapse.item2",
            path: "/group-collapse-menu-item-view-2",
            title: "Menu item 2",
            translateKey: "nav.groupMenu.collapse.item2",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: []
          }
        ]
      }
    ]
  }
];

export default navigationConfig;
