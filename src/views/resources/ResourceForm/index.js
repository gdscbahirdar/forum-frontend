import React, { forwardRef, useState } from "react";
import { FormContainer, Button } from "components/ui";
import { StickyFooter, ConfirmDialog } from "components/shared";
import { Form, Formik } from "formik";
import BasicInformationFields from "./BasicInformationFields";
import FilteringFields from "./FilteringFields";
import ResourceImages from "./ResourceImages";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Resource Name Required"),
  description: Yup.string().required("Resource Description Required"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "At least one category is required"),
  tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required")
});

export const DeleteResourceButton = ({ onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onConfirmDialogOpen = () => {
    setDialogOpen(true);
  };

  const onConfirmDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    onDelete?.(setDialogOpen);
  };

  return (
    <>
      <Button
        className="text-red-600"
        variant="plain"
        size="sm"
        icon={<HiOutlineTrash />}
        type="button"
        onClick={onConfirmDialogOpen}
      >
        Delete
      </Button>
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={onConfirmDialogClose}
        onRequestClose={onConfirmDialogClose}
        type="danger"
        title="Delete resource"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this resource? All record related to
          this resource will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

const ResourceForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard, onDelete } = props;

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
          files: initialData?.files.map(file => ({
            ...file,
            is_new: false
          }))
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let formData = new FormData();
          formData.append("title", values.title);
          formData.append("description", values.description);

          values.tags.forEach(tag => {
            formData.append("tags", tag);
          });

          values.categories.forEach(category => {
            formData.append("categories", category);
          });

          values.files.forEach(file => {
            if (file.is_new) formData.append("files", file.file);
          });

          if (values.filesToDelete) {
            values.filesToDelete.forEach(fileId => {
              formData.append("filesToDelete", fileId);
            });
          }

          await onFormSubmit?.(formData, setSubmitting);
          resetForm();
          formData = new FormData();
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <BasicInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                  <ResourceImages
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
                <div className="lg:col-span-1">
                  <FilteringFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div>
                  {type === "edit" && (
                    <DeleteResourceButton onDelete={onDelete} />
                  )}
                </div>
                <div className="flex items-center">
                  <Button
                    size="sm"
                    className="mr-3"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave />}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
});

ResourceForm.defaultProps = {
  type: "edit",
  initialData: {
    title: "",
    description: "",
    files: [],
    categories: [],
    tags: []
  }
};

export default ResourceForm;
