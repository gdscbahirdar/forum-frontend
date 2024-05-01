import React from "react";

const authRoute = [
  {
    key: "signIn",
    path: `/sign-in`,
    component: React.lazy(() => import("views/auth/SignIn")),
    authority: []
  }
  // {
  //   key: "landing",
  //   path: ``,
  //   component: React.lazy(() => import("components/layout/Landing")),
  //   authority: []
  // }
];

export default authRoute;
