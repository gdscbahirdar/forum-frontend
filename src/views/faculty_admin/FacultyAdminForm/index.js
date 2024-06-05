import React, { forwardRef } from "react";
import { FormContainer } from "components/ui";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as Yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoFormModal from "./PersonalInfoFormModal";

dayjs.extend(customParseFormat);

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  first_name: Yup.string().required("First Name Required"),
  middle_name: Yup.string().required("Middle Name Required"),
  last_name: Yup.string().required("Last Name Required"),
  gender: Yup.string().required("Gender Required"),
  faculty: Yup.string().required("Faculty Required")
});

const FacultyAdminForm = forwardRef((props, ref) => {
  const { faculty_admin, onFormSubmit, modal } = props;

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        username: faculty_admin?.username || "",
        first_name: faculty_admin?.first_name || "",
        middle_name: faculty_admin?.middle_name || "",
        last_name: faculty_admin?.last_name || "",
        gender: faculty_admin?.gender || "",
        faculty: faculty_admin?.faculty || ""
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
                  <h4>FacultyAdmin Info</h4>
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

export default FacultyAdminForm;
