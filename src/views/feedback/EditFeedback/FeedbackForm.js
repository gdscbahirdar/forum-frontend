import React from "react";
import {
  Input,
  FormItem,
  FormContainer,
  Button,
  Notification,
  toast
} from "components/ui";
import { RichTextEditor } from "components/shared";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import * as Yup from "yup";
import { apiAddFeedback, apiUpdateFeedback } from "services/FeedbackService";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  message: Yup.string().required("Message required")
});

const FeedbackForm = ({ mode }) => {
  const navigate = useNavigate();

  const feedback = useSelector(state => state.feedbackEdit.data.feedback);

  const onComplete = async (value, setSubmitting) => {
    setSubmitting(true);
    let resp;
    if (mode === "add") {
      resp = await apiAddFeedback(value);
    } else if (mode === "edit") {
      resp = await apiUpdateFeedback(feedback.pk, value);
    }
    setSubmitting(false);
    if (resp && resp.data) {
      toast.push(
        <Notification
          title={`Thanks for your feedback. We appreciate it!`}
          type="success"
        />,
        { placement: "top-center" }
      );
      navigate("/feedback");
    }
  };

  return (
    <Formik
      initialValues={{
        title: feedback.title ? feedback.title : "",
        message: feedback.message ? feedback.message : ""
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onComplete(values, setSubmitting);
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          {mode === "preview" ? (
            <div className="mt-6">
              <h4 className="mb-4">{values.title}</h4>
              <div className="prose dark:prose-invert max-w-none">
                {ReactHtmlParser(values.message || "")}
              </div>
            </div>
          ) : (
            <FormContainer>
              <FormItem
                label="Title"
                invalid={errors.title && touched.title}
                errorMessage={errors.title}
              >
                <Field autoComplete="off" name="title" component={Input} />
              </FormItem>
              <FormItem
                label="Message"
                className="mb-0"
                labelClass="!justify-start"
                invalid={errors.message && touched.message}
                errorMessage={errors.message}
              >
                <Field name="message">
                  {({ field, form }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={val => form.setFieldValue(field.name, val)}
                    />
                  )}
                </Field>
              </FormItem>
              <div className="mt-4 flex justify-end">
                <Button loading={isSubmitting} variant="solid">
                  Submit
                </Button>
              </div>
            </FormContainer>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FeedbackForm;
