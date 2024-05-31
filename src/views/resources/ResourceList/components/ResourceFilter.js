import React, { useState, useRef, forwardRef } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  getResources,
  setFilterData,
  initialTableData,
  getResourceCategories
} from "../store/dataSlice";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Drawer,
  Select
} from "components/ui";
import { Field, Form, Formik } from "formik";
import { getTags } from "views/question/Tags/store/dataSlice";

const FilterForm = forwardRef(({ onSubmitComplete }, ref) => {
  const dispatch = useDispatch();

  const filterData = useSelector(state => state.resources.data.filterData);
  const sortedColumn = useSelector(state => state.resources.state.sortedColumn);

  const handleSubmit = values => {
    onSubmitComplete?.();
    dispatch(setFilterData(values));
    const params = { ...initialTableData, ...values };
    dispatch(getResources(params));
    sortedColumn?.clearSortBy?.();
  };

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
    <Formik
      innerRef={ref}
      enableReinitialize
      initialValues={filterData}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({ values, touched, errors }) => (
        <Form>
          <FormContainer>
            <FormItem
              invalid={errors.title && touched.title}
              errorMessage={errors.title}
            >
              <h6 className="mb-4">Included text</h6>
              <Field
                type="text"
                autoComplete="off"
                name="title"
                placeholder="Keyword"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
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
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

const DrawerFooter = ({ onSaveClick, onCancel }) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Query
      </Button>
    </div>
  );
};

const ResourceFilter = () => {
  const formikRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = () => {
    setIsOpen(false);
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <div>
      <Button
        size="sm"
        className="md:ml-2"
        icon={<HiOutlineFilter />}
        onClick={() => openDrawer()}
      >
        Filter
      </Button>
      <Drawer
        title="Filter"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
      </Drawer>
    </div>
  );
};

export default ResourceFilter;
