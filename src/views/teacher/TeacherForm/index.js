import React, { forwardRef } from "react";
import { FormContainer } from "components/ui";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as Yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoFormModal from "./PersonalInfoFormModal";
import { useSelector } from "react-redux";

dayjs.extend(customParseFormat);

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  first_name: Yup.string().required("First Name Required"),
  middle_name: Yup.string().required("Middle Name Required"),
  last_name: Yup.string().required("Last Name Required"),
  gender: Yup.string().required("Gender Required"),
  faculty: Yup.string().required("Faculty Required"),
  departments: Yup.array()
    .of(Yup.string())
    .required("At least one department is required")
});

const TeacherForm = forwardRef((props, ref) => {
  const { teacher, onFormSubmit, modal } = props;

  const { user } = useSelector(state => state.auth);

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        username: teacher?.username || "",
        first_name: teacher?.first_name || "",
        middle_name: teacher?.middle_name || "",
        last_name: teacher?.last_name || "",
        gender: teacher?.gender || "",
        faculty:
          user.authority[0] === "Faculty Admin"
            ? user.faculty
            : teacher?.faculty || "",
        departments: teacher?.departments || ""
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit?.(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors, resetForm }) => (
        <Form>
          <FormContainer>
            <div className="p-6">
              {modal ? (
                <PersonalInfoFormModal touched={touched} errors={errors} />
              ) : (
                <>
                  <h4>Teacher Info</h4>
                  <div className="mt-4">
                    <PersonalInfoForm touched={touched} errors={errors} />
                  </div>
                </>
              )}
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

export default TeacherForm;
