import React from "react";
import { AdaptableCard } from "components/shared";
import { FormItem, Select } from "components/ui";
import AsyncSelect from "react-select/async";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import { getTags } from "views/question/Tags/store/dataSlice";
import { getResourceCategories } from "../ResourceList/store/dataSlice";

const FilteringFields = props => {
  const { values, touched, errors } = props;

  const dispatch = useDispatch();

  const loadTagOptions = async (inputValue, callback) => {
    const response = await dispatch(getTags({ search: inputValue }));
    const options = response?.payload?.data?.map(tag => ({
      value: tag.name,
      label: tag.name
    }));
    callback(options);
  };

  const loadCategoryOptions = async (inputValue, callback) => {
    const response = await dispatch(
      getResourceCategories({ search: inputValue })
    );

    const options = response?.payload?.data?.map(category => ({
      value: category.name,
      label: category.name
    }));

    callback(options);
  };

  return (
    <AdaptableCard className="mb-4" divider isLastChild>
      <div className="flex flex-col gap-1">
        <FormItem
          label="Categories"
          invalid={errors.categories && touched.categories}
          errorMessage={errors.categories}
        >
          <Field name="categories">
            {({ field, form }) => (
              <Select
                isMulti
                cacheOptions
                componentAs={AsyncSelect}
                loadOptions={loadCategoryOptions}
                defaultOptions
                placeholder="e.g. Exam Papers, Notes, Assignments"
                value={field.value.map(val => ({
                  value: val,
                  label: val
                }))}
                onChange={options => {
                  form.setFieldValue(
                    "categories",
                    options.map(option => option.value)
                  );
                }}
                noOptionsMessage={() => null}
              />
            )}
          </Field>
        </FormItem>
        <FormItem
          label="Tags"
          invalid={errors.tags && touched.tags}
          errorMessage={errors.tags}
        >
          <Field name="tags">
            {({ field, form }) => (
              <Select
                isMulti
                cacheOptions
                componentAs={AsyncSelect}
                loadOptions={loadTagOptions}
                defaultOptions
                placeholder="e.g. data-structures, algorithm, computer-science"
                value={field.value.map(val => ({
                  value: val,
                  label: val
                }))}
                onChange={options => {
                  form.setFieldValue(
                    "tags",
                    options.map(option => option.value)
                  );
                }}
                noOptionsMessage={() => null}
              />
            )}
          </Field>
        </FormItem>
      </div>
    </AdaptableCard>
  );
};

export default FilteringFields;
