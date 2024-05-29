import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  FormContainer,
  FormItem,
  Select,
  Card
} from "components/ui";
import { IconText, SvgIcon } from "components/shared";
import { useDispatch } from "react-redux";
import { getTags } from "../Tags/store/dataSlice";
import AsyncSelect from "react-select/async";
import Editor from "../RTE/Editor";

const QuestionCreateSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(150, "Title can't be longer than 150 characters"),
  body: Yup.string().required("Body is required"),
  tags: Yup.array().min(1, "Please select at least one tag")
});

const PencilIcon = () => {
  return (
    <svg
      aria-hidden="true"
      className="svg-spot spotPencil"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        d="M31.52 5.2a.34.34 0 0 0-.46.08L7 39.94a.34.34 0 0 0-.06.16l-.54 5.21c-.03.26.24.45.48.34l4.77-2.29c.05-.02.1-.06.13-.1L35.83 8.58a.34.34 0 0 0-.09-.47l-4.22-2.93Z"
        opacity=".2"
      ></path>
      <path d="M28.53 2.82c.4-.58 1.2-.73 1.79-.32l4.22 2.92c.58.4.72 1.2.32 1.79L10.82 41.87c-.13.18-.3.33-.5.43l-4.77 2.28c-.9.44-1.93-.29-1.83-1.29l.55-5.2c.02-.22.1-.43.22-.6L28.53 2.81Zm4.43 3.81L29.74 4.4 28.2 6.6l3.22 2.24 1.53-2.21Zm-2.6 3.76-3.23-2.24-20.32 29.3 3.22 2.24 20.32-29.3ZM5.7 42.4 8.62 41l-2.57-1.78-.34 3.18Zm35.12.3a1 1 0 1 0-.9-1.78 35 35 0 0 1-7.94 3.06c-1.93.43-3.8.3-5.71-.04-.97-.17-1.93-.4-2.92-.64l-.3-.07c-.9-.21-1.81-.43-2.74-.62-2.9-.58-6.6-.49-9.43.65a1 1 0 0 0 .74 1.86c2.4-.96 5.68-1.07 8.3-.55.88.18 1.77.4 2.66.6l.3.08c1 .24 2 .48 3.03.66 2.07.37 4.22.53 6.5.02 3-.67 5.77-1.9 8.41-3.22Z"></path>
    </svg>
  );
};

const QuestionForm = ({ question, handleSubmit }) => {
  const [activeField, setActiveField] = useState(null);

  const handleFocus = fieldName => {
    setActiveField(fieldName);
  };

  const dispatch = useDispatch();

  const loadTagOptions = async (inputValue, callback) => {
    const response = await dispatch(getTags({ search: inputValue }));
    const options = response?.payload?.data?.map(tag => ({
      value: tag.name,
      label: tag.name
    }));
    callback(options);
  };

  return (
    <Formik
      initialValues={{
        title: question.title || "",
        body: question.body || "{}",
        tags: question.tags || []
      }}
      validationSchema={QuestionCreateSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FormContainer>
            {activeField === "title" && (
              <FormItem>
                <Card
                  header={<span>Write a good title</span>}
                  headerClass="text-gray-800 bg-slate-50"
                  className="shadow-md"
                >
                  <IconText
                    className="text-xs text-gray-800"
                    icon={
                      <SvgIcon className="text-4xl">{<PencilIcon />}</SvgIcon>
                    }
                  >
                    <ul className="pl-4 flex flex-col gap-y-2">
                      <li>Your title should summarize the problem. </li>

                      <li>
                        You might find that you have a better idea of your title
                        after writing out the rest of the question.
                      </li>
                    </ul>
                  </IconText>
                </Card>
              </FormItem>
            )}
            <FormItem
              label="Title"
              invalid={errors.title && touched.title}
              errorMessage={errors.title}
              description="Be specific and imagine you’re asking a question to another person."
              className="border border-gray-200 rounded-md p-4"
            >
              <Field
                name="title"
                component={Input}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                className="placeholder:text-xs"
                onFocus={() => handleFocus("title")}
              />
            </FormItem>
            {activeField === "body" && (
              <FormItem>
                <Card
                  header={<span>Introduce the problem</span>}
                  headerClass="text-gray-800 bg-slate-50"
                >
                  <IconText
                    className="text-xs text-gray-800"
                    icon={
                      <SvgIcon className="text-4xl">{<PencilIcon />}</SvgIcon>
                    }
                  >
                    <ul className="pl-4">
                      <li>
                        Explain how you encountered the problem you’re trying to
                        solve, and any difficulties that have prevented you from
                        solving it yourself.
                      </li>
                    </ul>
                  </IconText>
                </Card>
              </FormItem>
            )}
            <FormItem
              label="Body"
              invalid={errors.body && touched.body}
              errorMessage={errors.body}
              description="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
            >
              <div
                tabIndex={0}
                onFocus={() => handleFocus("body")}
                style={{ outline: "none" }}
              >
                <Field name="body">
                  {({ field }) => (
                    <Editor
                      {...field}
                      initialValue={JSON.parse(field.value || "{}")}
                      onChange={val => {
                        field.onChange({
                          target: { name: "body", value: JSON.stringify(val) }
                        });
                      }}
                    />
                  )}
                </Field>
              </div>
            </FormItem>

            {activeField === "tags" && (
              <FormItem>
                <Card
                  header={<span>Adding tags</span>}
                  headerClass="text-gray-800 bg-slate-50"
                >
                  <IconText
                    className="text-xs text-gray-800"
                    icon={
                      <SvgIcon className="text-4xl">{<PencilIcon />}</SvgIcon>
                    }
                  >
                    <ul className="pl-4 flex flex-col gap-y-2">
                      <li>
                        Tags help ensure that your question will get attention
                        from the right people.
                      </li>
                      <li>
                        Tag things in more than one way so people can find them
                        more easily. Add tags for product lines, projects,
                        teams, and the specific technologies or languages used.
                      </li>
                      <li>Learn more about tagging</li>
                    </ul>
                  </IconText>
                </Card>
              </FormItem>
            )}
            <FormItem
              label="Tags"
              invalid={errors.tags && touched.tags}
              errorMessage={errors.tags}
              description="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
              className="border border-gray-200 rounded-md p-4"
            >
              <Field name="tags">
                {({ field, form }) => {
                  return (
                    <Select
                      isMulti
                      cacheOptions
                      loadOptions={loadTagOptions}
                      defaultOptions
                      placeholder="e.g. data-structures, algorithm, computer-science"
                      className="placeholder:text-xs"
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
                      onFocus={() => handleFocus("tags")}
                      componentAs={AsyncSelect}
                    />
                  );
                }}
              </Field>
            </FormItem>
            <div className="mt-4 flex justify-end">
              <Button loading={isSubmitting} variant="solid">
                Submit
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
