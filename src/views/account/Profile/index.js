import React from "react";
import {
  Input,
  Avatar,
  Upload,
  Button,
  Notification,
  toast,
  FormContainer,
  Tooltip
} from "components/ui";
import FormDescription from "../common/FormDescription";
import FormRow from "../common/FormRow";
import { Field, Form, Formik } from "formik";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineTrash
} from "react-icons/hi";
import * as Yup from "yup";
import { apiUpdateProfile } from "services/AccountServices";
import { useState } from "react";
import { setUser } from "store/auth/userSlice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  phone_number: Yup.string(),
  bio: Yup.string(),
  avatar: Yup.string().nullable()
});

function Profile({ data }) {
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const onSetFormFile = (form, field, file) => {
    setPreview(URL.createObjectURL(file[0]));
    form.setFieldValue(field.name, file[0]);
  };

  const onFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);

    try {
      let formData = new FormData();
      for (let key in values) {
        if (key === "avatar" && typeof values[key] === "string") {
          continue;
        }
        formData.append(key, values[key]);
      }
      const response = await apiUpdateProfile(formData);
      setSubmitting(false);
      if (response.data) {
        toast.push(
          <Notification
            title={"Profile updated successfully"}
            type="success"
          />,
          {
            placement: "top-center"
          }
        );
        dispatch(
          setUser({
            ...user,
            avatar: response.data.avatar
          })
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
              Failed to update profile: {Object.values(error).join(", ")}
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
    <Formik
      initialValues={data}
      enableReinitialize
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
                bio="General"
                desc="Basic info, like your email, phone number, avatar, and bio."
              />
              <FormRow name="email" label="Email" {...validatorProps}>
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                  prefix={<HiOutlineMail className="text-xl" />}
                />
              </FormRow>
              <FormRow
                name="phone_number"
                label="Phone Number"
                {...validatorProps}
              >
                <Field
                  type="tel"
                  autoComplete="off"
                  name="phone_number"
                  placeholder="Phone Number"
                  component={Input}
                  prefix="+251"
                />
              </FormRow>
              <FormRow name="avatar" label="Avatar" {...validatorProps}>
                <Field name="avatar">
                  {({ field, form }) => {
                    const avatarProps = preview
                      ? { src: preview }
                      : { src: field.value };
                    return (
                      <div className="flex items-center gap-4">
                        <Upload
                          className="cursor-pointer"
                          onChange={files => onSetFormFile(form, field, files)}
                          onFileRemove={files =>
                            onSetFormFile(form, field, files)
                          }
                          showList={false}
                          uploadLimit={1}
                        >
                          <Avatar
                            className="border-2 border-white dark:border-gray-800 shadow-lg"
                            size={60}
                            shape="circle"
                            icon={<HiOutlineUser />}
                            {...avatarProps}
                          />
                        </Upload>
                        {field.value && (
                          <button
                            type="button"
                            onClick={() => {
                              form.setFieldValue("avatar", "");
                              setPreview(null);
                            }}
                          >
                            <Tooltip title="Remove avatar" placement="right">
                              <HiOutlineTrash className="text-red-500" />
                            </Tooltip>
                          </button>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </FormRow>
              <FormRow
                name="bio"
                label="Bio"
                {...validatorProps}
                border={false}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="bio"
                  placeholder="Bio"
                  component={Input}
                  prefix={<HiOutlineDocumentText className="text-xl" />}
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
                  {isSubmitting ? "Updating" : "Update"}
                </Button>
              </div>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Profile;
