import React, { useEffect } from "react";
import { Notification, toast } from "components/ui";
import { useNavigate } from "react-router-dom";
import { apiPutQuestion } from "services/QuestionService";
import { useDispatch, useSelector } from "react-redux";
import { Loading, MediaSkeleton, TextBlockSkeleton } from "components/shared";
import useQuery from "utils/hooks/useQuery";
import { getQuestion } from "../store/dataSlice";
import QuestionForm from "views/question/QuestionForm";
import reducer from "../store";
import { injectReducer } from "store/index";

injectReducer("questionDetails", reducer);

const QuestionEdit = () => {
  const dispatch = useDispatch();

  const query = useQuery();

  const question = useSelector(
    state => state.questionDetails?.data.questionData
  );
  const loading = useSelector(state => state.questionDetails?.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    const id = query.get("id");
    if (id) {
      dispatch(getQuestion(id));
    }
  };

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
      const response = await apiPutQuestion(question?.slug, values);
      setSubmitting(false);

      if (response.data) {
        toast.push(
          <Notification title="Question updated successfully" type="success" />,
          { placement: "top-center" }
        );

        navigate(`/questions/question-details?id=${response.data.slug}`, {
          replace: true
        });
      }
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const messages = error.response.data;
        Object.keys(messages).forEach(key => {
          const error = messages[key];
          toast.push(
            <Notification title="Failure" type="danger">
              Failed to update question: {Object.values(error).join(", ")}
            </Notification>
          );
        });
      }
    }
  };

  return (
    <Loading
      loading={loading && question?.length !== 0}
      customLoader={
        <div className="flex flex-col gap-8">
          <MediaSkeleton />
          <TextBlockSkeleton rowCount={6} />
          <TextBlockSkeleton rowCount={4} />
          <TextBlockSkeleton rowCount={8} />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <h1 className="font-thin">Edit a question</h1>
        <QuestionForm
          question={{
            title: question?.title,
            body: question?.body,
            tags: question?.tags
          }}
          handleSubmit={handleSubmit}
        />
      </div>
    </Loading>
  );
};

export default QuestionEdit;
