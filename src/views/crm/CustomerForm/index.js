import React, { forwardRef } from "react";
import { Tabs, FormContainer } from "components/ui";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as Yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";

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

const { TabNav, TabList, TabContent } = Tabs;

const CustomerForm = forwardRef((props, ref) => {
  const { customer, onFormSubmit } = props;

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        username: customer.username,
        first_name: customer.first_name,
        middle_name: customer.middle_name,
        last_name: customer.last_name,
        faculty: customer.faculty,
        department: customer.department,
        year_in_school: customer.year_in_school,
        admission_date: dayjs(customer.admission_date, "YYYY/MM/DD").toDate(),
        graduation_date: dayjs(customer.graduation_date, "YYYY/MM/DD").toDate()
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
            <Tabs defaultValue="customerInfo">
              <TabList>
                <TabNav value="customerInfo">Customer Info</TabNav>
              </TabList>
              <div className="p-6">
                <TabContent value="customerInfo">
                  <PersonalInfoForm touched={touched} errors={errors} />
                </TabContent>
              </div>
            </Tabs>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

export default CustomerForm;
