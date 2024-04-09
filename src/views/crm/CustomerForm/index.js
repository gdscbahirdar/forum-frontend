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
  faculty: Yup.string().required("Faculty Required"),
  department: Yup.string().required("Department Required"),
  year_in_school: Yup.string().required("Year in School Required"),
  admission_date: Yup.string().required("Admission Date Required"),
  graduation_date: Yup.string().required("Graduation Date Required")
});

const CustomerForm = forwardRef((props, ref) => {
  const { student, onFormSubmit, modal } = props;

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        username: student?.username || "",
        first_name: student?.first_name || "",
        middle_name: student?.middle_name || "",
        last_name: student?.last_name || "",
        faculty: student?.faculty || "",
        department: student?.department || "",
        year_in_school: student?.year_in_school || "",
        admission_date:
          student?.admission_date &&
          dayjs(student?.admission_date, "YYYY/MM/DD").toDate(),
        graduation_date:
          student?.graduation_date &&
          dayjs(student?.graduation_date, "YYYY/MM/DD").toDate()
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
                  <h4>Student Info</h4>
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

export default CustomerForm;
