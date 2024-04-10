import React from "react";
import authRoute from "./authRoute";
import { FACULTY_ADMIN, SUPER_ADMIN } from "constants/roles.constant";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("views/Home")),
    authority: []
  },
  {
    key: "resetPassword",
    path: `/reset-password`,
    component: React.lazy(() => import("views/auth/ResetPassword")),
    authority: []
  },
  {
    key: "questions",
    path: "/questions",
    component: React.lazy(() => import("views/demo/SingleMenuView")),
    authority: []
  },
  {
    key: "tags",
    path: "/tags",
    component: React.lazy(() => import("views/demo/SingleMenuView")),
    authority: []
  },
  {
    key: "users.students",
    path: "/students",
    component: React.lazy(() => import("views/student/Students")),
    authority: [SUPER_ADMIN, FACULTY_ADMIN]
  },
  {
    key: "users.studentDetails",
    path: "/students/student-details",
    component: React.lazy(() => import("views/student/StudentDetail")),
    authority: [SUPER_ADMIN, FACULTY_ADMIN],
    meta: {
      header: "Student Details",
      headerContainer: true
    }
  },
  {
    key: "users.teachers",
    path: "/teachers",
    component: React.lazy(() => import("views/teacher/Teachers")),
    authority: [SUPER_ADMIN, FACULTY_ADMIN]
  },
  {
    key: "users.teacherDetails",
    path: "/teachers/teacher-details",
    component: React.lazy(() => import("views/teacher/TeacherDetail")),
    authority: [SUPER_ADMIN, FACULTY_ADMIN],
    meta: {
      header: "Teacher Details",
      headerContainer: true
    }
  },
  {
    key: "users.faculty_admin",
    path: "/faculty_admins",
    component: React.lazy(() => import("views/faculty_admin/FacultyAdmins")),
    authority: [SUPER_ADMIN]
  },
  {
    key: "users.facultyAdminDetails",
    path: "/faculty_admins/faculty_admin-details",
    component: React.lazy(
      () => import("views/faculty_admin/FacultyAdminDetail")
    ),
    authority: [SUPER_ADMIN],
    meta: {
      header: "Faculty Details",
      headerContainer: true
    }
  },
  {
    key: "groupMenu.saves",
    path: "/saves",
    component: React.lazy(() => import("views/demo/GroupSingleMenuItemView")),
    authority: []
  },
  {
    key: "groupMenu.reputations",
    path: "/reputations",
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
