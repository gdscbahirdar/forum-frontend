import React from "react";
import authRoute from "./authRoute";
import { FACULTY_ADMIN, SUPER_ADMIN } from "constants/roles.constant";
import { APP_PREFIX_PATH } from "constants/route.constant";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("views/question/Questions")),
    authority: []
  },
  {
    key: "questions.questionDetails",
    path: "/questions/question-details",
    component: React.lazy(() => import("views/question/QuestionDetail")),
    authority: []
  },
  {
    key: "questions.questionEdit",
    path: "/questions/question-edit",
    component: React.lazy(
      () => import("views/question/QuestionDetail/components/QuestionEdit")
    ),
    authority: []
  },
  {
    key: "questions.answerEdit",
    path: "/questions/answer-edit",
    component: React.lazy(
      () => import("views/question/QuestionDetail/components/AnswerEdit")
    )
  },
  {
    key: "tags.tags",
    path: "/tags",
    component: React.lazy(() => import("views/question/Tags")),
    authority: []
  },
  {
    key: "questions.tagged",
    path: "/questions/tagged/:tag",
    component: React.lazy(() => import("views/question/Questions")),
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
    component: React.lazy(() => import("views/question/Questions")),
    authority: []
  },
  {
    key: "questions.create",
    path: "/question/create",
    component: React.lazy(() => import("views/question/QuestionCreate")),
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
    key: "others.saves",
    path: "/saves",
    component: React.lazy(() => import("views/bookmark/Bookmarks")),
    authority: []
  },
  {
    key: "appsAccount.settings",
    path: `${APP_PREFIX_PATH}/account/settings/:tab`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [],
    meta: {
      header: "Settings",
      headerContainer: true
    }
  },
  {
    key: "appsAccount.activity",
    path: `${APP_PREFIX_PATH}/account/settings/activity/:category`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [],
    meta: {
      header: "Settings",
      headerContainer: true
    }
  },
  {
    key: "feedback",
    path: "/feedback",
    component: React.lazy(() => import("views/feedback/FeedbackList")),
    authority: [],
    meta: {
      header: "Manage Feedback",
      extraHeader: React.lazy(
        () => import("views/feedback/FeedbackList/FeedbackHeader")
      ),
      headerContainer: true
    }
  },
  {
    key: "editFeedback",
    path: `${APP_PREFIX_PATH}/feedback/edit-feedback`,
    component: React.lazy(() => import("views/feedback/EditFeedback")),
    authority: []
  },
  {
    key: "leaderboard",
    path: `/leaderboard`,
    component: React.lazy(() => import("views/leaderboard")),
    authority: []
  },
  {
    key: "userProfile",
    path: "/users/:username/answers",
    component: React.lazy(() => import("views/account/Public")),
    authority: []
  },
  {
    key: "userProfileTab",
    path: "/users/:username/:tab",
    component: React.lazy(() => import("views/account/Public")),
    authority: []
  },
  {
    key: "help",
    path: "/help",
    component: React.lazy(() => import("views/help")),
    authority: []
  },
  {
    key: "help.articles",
    path: "/help-articles",
    component: React.lazy(() => import("views/help/components/ArticleList")),
    authority: []
  },
  {
    key: "help.article",
    path: "/help-article",
    component: React.lazy(() => import("views/help/components/ArticleContent")),
    authority: []
  },
  // {
  //   key: "others.collapse.item1",
  //   path: "/group-collapse-menu-item-view-1",
  //   component: React.lazy(
  //     () => import("views/demo/GroupCollapseMenuItemView1")
  //   ),
  //   authority: []
  // },
  // {
  //   key: "others.collapse.item2",
  //   path: "/group-collapse-menu-item-view-2",
  //   component: React.lazy(
  //     () => import("views/demo/GroupCollapseMenuItemView2")
  //   ),
  //   authority: []
  // }
  {
    key: "resources.resourceList",
    path: `/resource-list`,
    component: React.lazy(() => import("views/resources/ResourceList")),
    authority: []
  },
  {
    key: "resources.resourceEdit",
    path: `/resource-edit/:resourceId`,
    component: React.lazy(() => import("views/resources/ResourceEdit")),
    authority: [],
    meta: {
      header: "Edit Resource"
    }
  },
  {
    key: "resources.resourceNew",
    path: `/resource-new`,
    component: React.lazy(() => import("views/resources/ResourceNew")),
    authority: [],
    meta: {
      header: "Add New Resource"
    }
  },
  {
    key: "resources.resourceDetail",
    path: `/resource-details/:id`,
    component: React.lazy(() => import("views/resources/ResourceDetail")),
    authority: []
  },
  {
    key: "resources.myUploads",
    path: `/my-uploads`,
    component: React.lazy(() => import("views/resources/ResourceList")),
    authority: []
  },
  {
    key: "notifications",
    path: `${APP_PREFIX_PATH}/notifications`,
    component: React.lazy(() => import("views/notifications/NotificationList")),
    authority: []
  }
];
