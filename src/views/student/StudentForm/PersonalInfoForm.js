import React from "react";
import { DatePicker, Input, FormItem, Select } from "components/ui";
import { Field } from "formik";
import { useSelector } from "react-redux";

const PersonalInfoForm = props => {
  const { touched, errors } = props;

  const faculties = useSelector(state => state.meta.faculties);

  const facultyOptions = faculties.map(faculty => ({
    value: faculty.name,
    label: faculty.name
  }));

  return (
    <>
      <FormItem
        label="Username"
        invalid={errors.username && touched.username}
        errorMessage={errors.username}
      >
        <Field
          type="text"
          autoComplete="off"
          name="username"
          placeholder="Username"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="First Name"
        invalid={errors.first_name && touched.first_name}
        errorMessage={errors.first_name}
      >
        <Field
          type="text"
          autoComplete="off"
          name="first_name"
          placeholder="First Name"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Middle Name"
        invalid={errors.middle_name && touched.middle_name}
        errorMessage={errors.middle_name}
      >
        <Field
          type="text"
          autoComplete="off"
          name="middle_name"
          placeholder="Middle Name"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Last Name"
        invalid={errors.last_name && touched.last_name}
        errorMessage={errors.last_name}
      >
        <Field
          type="text"
          autoComplete="off"
          name="last_name"
          placeholder="Last Name"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Faculty"
        invalid={errors.faculty && touched.faculty}
        errorMessage={errors.faculty}
      >
        <Field name="faculty">
          {({ field, form }) => (
            <Select
              options={facultyOptions}
              placeholder="Select Faculty"
              value={facultyOptions.find(
                option => option.value === field.value
              )}
              onChange={option => {
                form.setFieldValue("faculty", option.value);
                form.setFieldValue("department", "");
              }}
            />
          )}
        </Field>
      </FormItem>
      <FormItem
        label="Department"
        invalid={errors.department && touched.department}
        errorMessage={errors.department}
      >
        <Field name="department">
          {({ field, form }) => {
            const selectedFaculty = form.values.faculty;
            const departments = selectedFaculty
              ? faculties.find(faculty => faculty.name === selectedFaculty)
                  ?.departments || []
              : [];
            const departmentOptions = departments.map(department => ({
              value: department,
              label: department
            }));
            return (
              <Select
                options={departmentOptions}
                placeholder="Select Department"
                isDisabled={!selectedFaculty}
                value={departmentOptions.find(
                  option => option.value === field.value
                )}
                onChange={option =>
                  form.setFieldValue("department", option.value)
                }
              />
            );
          }}
        </Field>
      </FormItem>
      <FormItem
        label="Year in School"
        invalid={errors.year_in_school && touched.year_in_school}
        errorMessage={errors.year_in_school}
      >
        <Field
          type="number"
          max={5}
          min={1}
          autoComplete="off"
          name="year_in_school"
          placeholder="Year in School"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Admission Date"
        invalid={errors.admission_date && touched.admission_date}
        errorMessage={errors.admission_date}
      >
        <Field name="admission_date" placeholder="Date">
          {({ field, form }) => (
            <DatePicker
              field={field}
              form={form}
              value={field.value}
              onChange={date => {
                form.setFieldValue(field.name, date);
              }}
            />
          )}
        </Field>
      </FormItem>
      <FormItem
        label="Graduation Date"
        invalid={errors.graduation_date && touched.graduation_date}
        errorMessage={errors.graduation_date}
      >
        <Field name="graduation_date" placeholder="Date">
          {({ field, form }) => (
            <DatePicker
              field={field}
              form={form}
              value={field.value}
              onChange={date => {
                form.setFieldValue(field.name, date);
              }}
            />
          )}
        </Field>
      </FormItem>
    </>
  );
};

export default PersonalInfoForm;