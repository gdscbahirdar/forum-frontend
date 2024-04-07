import React from "react";

const authRoute = [
  {
    key: "signIn",
    path: `/sign-in`,
    component: React.lazy(() => import("views/auth/SignIn")),
    authority: []
  }
];

export default authRoute;
