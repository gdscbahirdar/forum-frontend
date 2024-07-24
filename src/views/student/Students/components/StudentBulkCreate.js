import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Dialog,
  FormContainer,
  Notification,
  toast
} from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { toggleStudentsUpload } from "../store/stateSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { BsCloudUpload } from "react-icons/bs";
import CloseButton from "components/ui/CloseButton";
import { apiBulkCreateStudents } from "services/StudentService";

const DialogFooter = ({ onSaveClick, onCancel }) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
};

const StudentBulkCreate = () => {
  const dispatch = useDispatch();
  const studentsUpload = useSelector(
    state => state.students.state.studentsUpload
  );
  const [filePreview, setFilePreview] = useState(null);

  const onDialogClose = () => {
    dispatch(toggleStudentsUpload(false));
  };

  const formikRef = useRef();

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const initialValues = {
    file: null
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("A file is required")
  });

  const handleSubmit = async values => {
    try {
      if (values.file) {
        const response = await apiBulkCreateStudents(values.file);
        if (response.data.message) {
          toast.push(
            <Notification title={response.data.message} type="success" />,
            {
              placement: "top-center"
            }
          );
          window.location.reload();
        } else {
          toast.push(
            <Notification title="Failure" type="danger">
              {response.data.error}
            </Notification>,
            {
              placement: "top-center"
            }
          );
        }
      }
    } catch (error) {
      toast.push(
        <Notification title="Failure" type="danger">
          {error.response.data.error}
        </Notification>,
        {
          placement: "top-center"
        }
      );
    }
    onDialogClose();
  };

  const handleFileChange = (setFieldValue, event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("file", file);
    setFilePreview(file);
  };

  const handleFileDelete = setFieldValue => {
    setFieldValue("file", null);
    setFilePreview(null);
  };

  return (
    <Dialog
      width={800}
      isOpen={studentsUpload}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Upload Excel/CSV File</h5>

      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  <a
                    href="/data/student_upload_template.csv"
                    download
                    className="text-blue-500 underline"
                  >
                    Download template
                  </a>
                </label>
                <Field name="file">
                  {({ field }) => (
                    <>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        className="hidden"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={event =>
                          handleFileChange(setFieldValue, event)
                        }
                      />
                      <label htmlFor="file">
                        <Card
                          className="group border-dashed border-2 hover:border-indigo-600"
                          clickable
                        >
                          <div className="flex flex-col justify-center items-center py-5">
                            <div className="p-4 border-2 border-dashed rounded-full border-gray-200 dark:border-gray-600 group-hover:border-indigo-600">
                              <BsCloudUpload className="text-4xl text-gray-200 dark:text-gray-600 group-hover:text-indigo-600" />
                            </div>
                            <p className="mt-5 font-semibold">Upload File</p>
                          </div>
                        </Card>
                      </label>
                      {filePreview && (
                        <div className="mt-4 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p>{filePreview.name}</p>
                            <CloseButton
                              onClick={() => handleFileDelete(setFieldValue)}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <DialogFooter onCancel={onDialogClose} onSaveClick={formSubmit} />
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default StudentBulkCreate;
