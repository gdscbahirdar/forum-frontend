import React from "react";
import { AdaptableCard, RichTextEditor } from "components/shared";
import { Input, FormItem } from "components/ui";
import { Field } from "formik";

const BasicInformationFields = props => {
  const { touched, errors } = props;

  return (
    <AdaptableCard className="mb-4" divider>
      <FormItem
        label="Resource Title"
        invalid={errors.title && touched.title}
        errorMessage={errors.title}
      >
        <Field
          type="text"
          autoComplete="off"
          name="title"
          placeholder="Title"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Description"
        labelClass="!justify-start"
        invalid={errors.description && touched.description}
        errorMessage={errors.description}
      >
        <Field name="description">
          {({ field, form }) => (
            <RichTextEditor
              value={field.value}
              onChange={val => form.setFieldValue(field.name, val)}
            />
          )}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default BasicInformationFields;
