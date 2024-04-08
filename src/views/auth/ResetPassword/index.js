import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import Simple from "components/layout/AuthLayout/Simple";

const ResetPassword = props => {
  return (
    <Simple>
      <ResetPasswordForm {...props} />
    </Simple>
  );
};

export default ResetPassword;
