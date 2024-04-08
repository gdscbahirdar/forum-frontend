import React from "react";
import { DatePicker, Input, FormItem, Avatar, Upload } from "components/ui";
import { Field } from "formik";

const PersonalInfoForm = props => {
  const { touched, errors } = props;

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, URL.createObjectURL(file[0]));
  };

  return (
    <>
      <FormItem
        invalid={errors.upload && touched.upload}
        errorMessage={errors.upload}
      >
        <Field name="img">
          {({ field, form }) => {
            const avatarProps = field.value ? { src: field.value } : {};
            return (
              <div className="flex justify-center">
                <Upload
                  className="cursor-pointer"
                  onChange={files => onSetFormFile(form, field, files)}
                  onFileRemove={files => onSetFormFile(form, field, files)}
                  showList={false}
                  uploadLimit={1}
                >
                  <Avatar
                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                    size={100}
                    shape="circle"
                    {...avatarProps}
                  />
                </Upload>
              </div>
            );
          }}
        </Field>
      </FormItem>
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
        <Field
          type="text"
          autoComplete="off"
          name="faculty"
          placeholder="Faculty"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Department"
        invalid={errors.department && touched.department}
        errorMessage={errors.department}
      >
        <Field
          type="text"
          autoComplete="off"
          name="department"
          placeholder="Department"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Year in School"
        invalid={errors.year_in_school && touched.year_in_school}
        errorMessage={errors.year_in_school}
      >
        <Field
          type="text"
          autoComplete="off"
          name="year_in_school"
          placeholder="Year in School"
          component={Input}
        />
      </FormItem>
      {/* <FormItem
        label="Location"
        invalid={errors.location && touched.location}
        errorMessage={errors.location}
      >
        <Field
          type="text"
          autoComplete="off"
          name="location"
          placeholder="Location"
          component={Input}
          prefix={<HiLocationMarker className="text-xl" />}
        />
      </FormItem> */}
      {/* <FormItem
        label="Phone Number"
        invalid={errors.phoneNumber && touched.phoneNumber}
        errorMessage={errors.phoneNumber}
      >
        <Field
          type="text"
          autoComplete="off"
          name="phoneNumber"
          placeholder="Phone Number"
          component={Input}
          prefix={<HiPhone className="text-xl" />}
        />
      </FormItem> */}
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
