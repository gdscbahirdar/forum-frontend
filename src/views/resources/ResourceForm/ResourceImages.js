import React from "react";
import { AdaptableCard } from "components/shared";
import { FormItem, Upload } from "components/ui";
import { Field } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import FileItem from "./FileItem";
import CloseButton from "components/ui/CloseButton";

const ResourceFiles = props => {
  const { values, type } = props;

  const onFilesChange = (uploadedFiles, form, field) => {
    const filesArray = Array.from(uploadedFiles);

    const files = filesArray.map((file, index) => ({
      id: index,
      file_name: file.name,
      file: file,
      file_size: file.size,
      file_type: file.type,
      is_new: true
    }));

    const updatedFileList = [
      ...(values.files.filter(file => !file.is_new) || []),
      ...files
    ];

    form.setFieldValue(field.name, updatedFileList);
  };

  const handleFileDelete = (form, field, deletedFile) => {
    const updatedFileList = (values.files || []).filter(
      file => !(file.id === deletedFile.id)
    );

    if (!deletedFile.is_new) {
      const filesToDelete = values.filesToDelete || [];
      form.setFieldValue("filesToDelete", [...filesToDelete, deletedFile.id]);
    }

    form.setFieldValue(field.name, updatedFileList);
  };

  return (
    <AdaptableCard className="mb-4">
      <h5>Resource Files</h5>
      <p className="mb-6">Add or change files for the resource</p>
      <FormItem>
        <Field name="files">
          {({ field, form }) => (
            <>
              <Upload
                className="min-h-fit"
                onChange={e => onFilesChange(e, form, field)}
                showList={false}
                draggable
                multiple
              >
                <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                  <BsCloudUpload className="text-4xl" />
                  <p className="font-semibold text-center text-gray-800 dark:text-white">
                    Upload
                  </p>
                  <p className="mt-1 opacity-60 dark:text-white">
                    Support: pdf, ppt, jpg, png, zip, etc
                  </p>
                </div>
              </Upload>
              <div className="mt-4">
                {values.files && values.files.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {values.files.map((file, index) => (
                      <FileItem key={index} file={file} type={type}>
                        <CloseButton
                          onClick={() => handleFileDelete(form, field, file)}
                          className="upload-file-remove"
                        />
                      </FileItem>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default ResourceFiles;
