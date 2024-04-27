import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../store/dataSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useLocation } from "react-router-dom";
import { Loading, MediaSkeleton, TextBlockSkeleton } from "components/shared";
import QuestionAction from "./QuestionAction";
import { MdPreview } from "md-editor-rt";
import AnswerCreate from "./AnswerCreate";

dayjs.extend(relativeTime);

const QuestionContent = ({ questionId }) => {
  const dispatch = useDispatch();

  const question = useSelector(
    state => state.questionDetails.data.questionData
  );
  const loading = useSelector(state => state.questionDetails.data.loading);

  const { search } = useLocation();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchData = () => {
    if (questionId) {
      dispatch(getQuestion(questionId));
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
      <h3>{question.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center mt-4 gap-4">
          {question.asked_by}
          <div className="text-xs">
            <div className="mb-1">
              Created by:
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {question.asked_by}
              </span>
            </div>
            <div>
              <span>Last updated: {dayjs(question.updated_at).fromNow()}</span>
              <span className="mx-2">•</span>
              <span>{question.vote_count} votes</span>
              <span className="mx-2">•</span>
              <span>{question.view_count} viewed</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Link to={`/questions/question-edit?id=${question.slug}`}>
            <button>Edit</button>
          </Link>
          <button>Delete</button>
        </div>
      </div>
      <div className="mt-8 prose dark:prose-invert max-w-none">
        <MdPreview modelValue={question.body} />
      </div>
      {/* <QuestionAction /> */}
      <AnswerCreate questionId={questionId} />
    </Loading>
  );
};

export default QuestionContent;
