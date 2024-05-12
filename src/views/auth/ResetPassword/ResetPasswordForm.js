import React, { useState } from "react";
import {
  Button,
  FormItem,
  FormContainer,
  Alert,
  toast,
  Notification
} from "components/ui";
import { PasswordInput } from "components/shared";
import { apiResetPassword } from "services/AuthService";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useAuth from "utils/hooks/useAuth";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Please enter your old password"),
  password: Yup.string().required("Please enter your password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Your passwords do not match"
  )
});

const ResetPasswordForm = props => {
  const { disableSubmit = false, className } = props;

  const [resetComplete, setResetComplete] = useState(false);

  const [message, setMessage] = useTimeOutMessage();

  const { signOut } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (values, setSubmitting) => {
    const { oldPassword, password, confirmPassword } = values;
    setSubmitting(true);
    try {
      const resp = await apiResetPassword({
        old_password: oldPassword,
        new_password1: password,
        new_password2: confirmPassword
      });
      if (resp.data) {
        toast.push(
          <Notification title="Success" type="success">
            Your password has been successfully reset
          </Notification>
        );
        setSubmitting(false);
        setResetComplete(true);
        signOut();
      }
    } catch (errors) {
      toast.push(
        <Notification title="Failure" type="danger">
          Failed to reset password
        </Notification>
      );
      setMessage(errors?.response?.data?.new_password2 || errors.toString());
      setSubmitting(false);
    }
  };

  const onContinue = () => {
    navigate("/home");
  };

  return (
    <div className={className}>
      <div className="mb-6">
        {resetComplete ? (
          <>
            <h3 className="mb-1">Reset done</h3>
            <p>Your password has been successfully reset</p>
          </>
        ) : (
          <>
            <h3 className="mb-1">Set New Password</h3>
          </>
        )}
      </div>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSubmit(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              {!resetComplete ? (
                <>
                  <FormItem
                    label="Old Password"
                    invalid={errors.oldPassword && touched.oldPassword}
                    errorMessage={errors.oldPassword}
                  >
                    <Field
                      autoComplete="off"
                      name="oldPassword"
                      placeholder="Old Password"
                      component={PasswordInput}
                    />
                  </FormItem>
                  <FormItem
                    label="Password"
                    invalid={errors.password && touched.password}
                    errorMessage={errors.password}
                  >
                    <Field
                      autoComplete="off"
                      name="password"
                      placeholder="Password"
                      component={PasswordInput}
                    />
                  </FormItem>
                  <FormItem
                    label="Confirm Password"
                    invalid={errors.confirmPassword && touched.confirmPassword}
                    errorMessage={errors.confirmPassword}
                  >
                    <Field
                      autoComplete="off"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      component={PasswordInput}
                    />
                  </FormItem>
                  <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </>
              ) : (
                <Button
                  block
                  variant="solid"
                  type="button"
                  onClick={onContinue}
                >
                  Go Back Home
                </Button>
              )}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
