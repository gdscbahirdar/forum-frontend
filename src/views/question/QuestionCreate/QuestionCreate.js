import React from "react";
import { Notification, toast } from "components/ui";
import { useNavigate } from "react-router-dom";
import { apiCreateQuestion } from "services/QuestionService";
import QuestionForm from "../QuestionForm";

const QuestionCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { title, body, tags } = values;

    values = {
      title,
      post: {
        body
      },
      tags
    };

    setSubmitting(true);

    try {
      const response = await apiCreateQuestion(values);
      setSubmitting(false);

      if (response.data) {
        toast.push(
          <Notification title="Question posted successfully" type="success" />,
          { placement: "top-center" }
        );

        navigate(`/questions/question-details?id=${response.data.slug}`);
      }
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const messages = error.response.data;
        Object.keys(messages).forEach(key => {
          const error = messages[key];
          toast.push(
            <Notification title="Failure" type="danger">
              Failed to create question: {Object.values(error).join(", ")}
            </Notification>
          );
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-thin">Ask a question</h1>
      <QuestionForm question={{}} handleSubmit={handleSubmit} />
    </div>
  );
};

export default QuestionCreate;
