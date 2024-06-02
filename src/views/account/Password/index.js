import React from "react";
import {
  Input,
  Button,
  Notification,
  toast,
  FormContainer
} from "components/ui";
import FormDescription from "../common/FormDescription";
import FormRow from "../common/FormRow";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { apiUpdatePassword } from "services/AccountServices";

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("Password Required"),
  new_password1: Yup.string()
    .required("Enter your new password")
    .min(8, "Too Short!")
    .matches(/^[A-Za-z0-9_-]*$/, "Only Letters & Numbers Allowed"),
  new_password2: Yup.string().oneOf(
    [Yup.ref("new_password1"), null],
    "Password not match"
  )
});

const Password = () => {
  const onFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);

    try {
      const response = await apiUpdatePassword(values);
      setSubmitting(false);

      if (response.data) {
        toast.push(
          <Notification
            title={"Password updated successfully"}
            type="success"
          />,
          {
            placement: "top-center"
          }
        );
      }
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const messages = error.response.data;
        Object.keys(messages).forEach(key => {
          const error = messages[key];
          toast.push(
            <Notification title="Failure" type="danger">
              Failed to update password: {Object.values(error).join(", ")}
            </Notification>,
            {
              placement: "top-center"
            }
          );
        });
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          password: "",
          new_password1: "",
          new_password2: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            onFormSubmit(values, setSubmitting);
          }, 1000);
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => {
          const validatorProps = { touched, errors };
          return (
            <Form>
              <FormContainer>
                <FormDescription
                  title="Password"
                  desc="Enter your current & new password to reset your password"
                />
                <FormRow
                  name="old_password"
                  label="Current Password"
                  {...validatorProps}
                >
                  <Field
                    type="password"
                    autoComplete="off"
                    name="old_password"
                    placeholder="Current Password"
                    component={Input}
                  />
                </FormRow>
                <FormRow
                  name="new_password1"
                  label="New Password"
                  {...validatorProps}
                >
                  <Field
                    type="password"
                    autoComplete="off"
                    name="new_password1"
                    placeholder="New Password"
                    component={Input}
                  />
                </FormRow>
                <FormRow
                  name="new_password2"
                  label="Confirm Password"
                  {...validatorProps}
                >
                  <Field
                    type="password"
                    autoComplete="off"
                    name="new_password2"
                    placeholder="Confirm Password"
                    component={Input}
                  />
                </FormRow>
                <div className="mt-4 ltr:text-right">
                  <Button
                    className="ltr:mr-2 rtl:ml-2"
                    type="button"
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                  <Button variant="solid" loading={isSubmitting} type="submit">
                    {isSubmitting ? "Updating" : "Update Password"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Password;
