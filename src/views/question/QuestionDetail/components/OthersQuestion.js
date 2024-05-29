import React, { useEffect } from "react";
import classNames from "classnames";
import { Loading, TextBlockSkeleton } from "components/shared";
import isLastChild from "utils/isLastChild";
import { getOthersQuestion } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import truncateJson from "utils/json-truncate";

dayjs.extend(relativeTime);

const Loaders = ({ counts = 2 }) => {
  return (
    <div className="flex flex-col mt-6">
      {Array.from(new Array(counts), (_, i) => i + 1).map((loader, index) => (
        <div key={index}>
          <TextBlockSkeleton key={loader} rowCount={2} />
          {index !== counts - 1 && <hr className="my-6" />}
        </div>
      ))}
    </div>
  );
};

const QuestionItem = ({ data, isLastChild }) => {
  return (
    <div
      className={classNames(
        "py-6 group cursor-pointer",
        !isLastChild && "border-b border-gray-200 dark:border-gray-600"
      )}
    >
      <Link to={`/questions/question-details?id=${data.slug}`}>
        <h6 className="mb-1 group-hover:underline !text-sm">{data.title}</h6>
      </Link>
      <p className="mb-1">{truncateJson(JSON.parse(data.body), 40)}</p>
      <span className="text-xs">
        Updated {dayjs(data.updated_at).fromNow()}
      </span>
    </div>
  );
};

const OthersQuestion = ({ questionId }) => {
  const dispatch = useDispatch();

  const { popularQuestion, relatedQuestion } = useSelector(
    state => state.questionDetails.data.othersQuestion
  );
  const loading = useSelector(state => state.questionDetails.data.otherLoading);

  const { search } = useLocation();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchData = () => {
    if (questionId) {
      dispatch(getOthersQuestion(questionId));
    }
  };

  return (
    <div className="lg:w-[400px] mt-6 ltr:lg:border-l rtl:lg:border-r border-gray-200 dark:border-gray-600 md:px-8">
      {relatedQuestion?.length > 0 && (
        <div className="mb-8">
          <h4>Related Questions</h4>
          <Loading customLoader={<Loaders />} loading={loading}>
            {relatedQuestion.map((question, index) => (
              <QuestionItem
                key={question.id}
                data={question}
                isLastChild={isLastChild(relatedQuestion, index)}
              />
            ))}
          </Loading>
        </div>
      )}
      {popularQuestion?.length > 0 && (
        <div>
          <h4>Popular Questions</h4>
          <Loading customLoader={<Loaders counts={4} />} loading={loading}>
            {popularQuestion.map((question, index) => (
              <QuestionItem
                key={question.id}
                data={question}
                isLastChild={isLastChild(popularQuestion, index)}
              />
            ))}
          </Loading>
        </div>
      )}
    </div>
  );
};

export default OthersQuestion;
