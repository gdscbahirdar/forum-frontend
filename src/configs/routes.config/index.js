import React from "react";
import authRoute from "./authRoute";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("views/Home")),
    authority: []
  },
  /** Example purpose only, please remove */
  {
    key: "singleMenuItem",
    path: "/single-menu-view",
    component: React.lazy(() => import("views/demo/SingleMenuView")),
    authority: []
  },
  {
    key: "users.students",
    path: "/students",
    component: React.lazy(() => import("views/crm/Customers")),
    authority: ["Super Admin", "Faculty Admin"]
  },
  {
    key: "users.teachers",
    path: "/teachers",
    component: React.lazy(() => import("views/demo/CollapseMenuItemView2")),
    authority: ["Super Admin", "Faculty Admin"]
  },
  {
    key: "users.faculty_admin",
    path: "/faculty_admin",
    component: React.lazy(() => import("views/demo/CollapseMenuItemView2")),
    authority: ["Super Admin"]
  },
  {
    key: "groupMenu.single",
    path: "/group-single-menu-item-view",
    component: React.lazy(() => import("views/demo/GroupSingleMenuItemView")),
    authority: []
  },
  {
    key: "groupMenu.collapse.item1",
    path: "/group-collapse-menu-item-view-1",
    component: React.lazy(
      () => import("views/demo/GroupCollapseMenuItemView1")
    ),
    authority: []
  },
  {
    key: "groupMenu.collapse.item2",
    path: "/group-collapse-menu-item-view-2",
    component: React.lazy(
      () => import("views/demo/GroupCollapseMenuItemView2")
    ),
    authority: []
  }
];
