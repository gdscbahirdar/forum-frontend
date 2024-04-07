import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM
} from "constants/navigation.constant";

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
  /** Example purpose only, please remove */
  {
    key: "singleMenuItem",
    path: "/single-menu-view",
    title: "Single menu item",
    translateKey: "nav.singleMenuItem",
    icon: "singleMenu",
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
    authority: ["Super Admin", "Faculty Admin"],
    subMenu: [
      {
        key: "users.students",
        path: "/students",
        title: "Students",
        translateKey: "nav.users.students",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: ["Super Admin", "Faculty Admin"],
        subMenu: []
      },
      {
        key: "users.teachers",
        path: "/teachers",
        title: "Teachers",
        translateKey: "nav.users.teachers",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: ["Super Admin", "Faculty Admin"],
        subMenu: []
      },
      {
        key: "users.faculty_admin",
        path: "/faculty_admin",
        title: "Faculty Admin",
        translateKey: "nav.users.faculty_admin",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: ["Super Admin"],
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
        key: "groupMenu.single",
        path: "/group-single-menu-item-view",
        title: "Group single menu item",
        translateKey: "nav.groupMenu.single",
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
