import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookmarkedPosts } from "../store/dataSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loading } from "components/shared";
import { Card, Tag } from "components/ui";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const BookmarkedAnswer = ({ answer, question_slug }) => {
  return (
    <blockquote className="pl-4 pt-2 pb-2 border-l-4 border-gray-300 bg-gray-50">
      <div>
        <div className="text-sm mb-1">{answer.post.vote_count} votes</div>
        <div className="text-sm mb-1 mt-2">
          {answer.post.body.length > 230
            ? answer.post.body.substring(0, 229) + "..."
            : answer.post.body}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <Link
            to={`/questions/question-details?id=${question_slug}/#answer-${answer.id}`}
          >
            View answer
          </Link>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">
            {answer.answered_by} - answered {dayjs(answer.created_at).fromNow()}
          </div>
        </div>
      </div>
    </blockquote>
  );
};

function BookmarkedPosts() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.bookmarks.data.bookmarkList);
  const loading = useSelector(state => state.bookmarks.data.loading);

  const fetchData = useCallback(() => {
    dispatch(getUserBookmarkedPosts());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Loading loading={loading && data?.length !== 0}>
      <section className="max-w-[1000px]">
        {data.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="mt-6 text-center">
              <p className="text-base">
                No bookmarks found. Bookmark a question and/or answer to see it
                here.
              </p>
            </div>
          </div>
        )}
        {data.length !== 0 &&
          data.map(question =>
            question.bookmarked_answers.length > 0 ? (
              question.bookmarked_answers.map(answer => (
                <article key={`${question.id}-${answer.id}`}>
                  <Card className="group mb-4">
                    {renderQuestionDetails(question)}
                    <div className="pl-28 pt-4 pb-2">
                      <BookmarkedAnswer
                        answer={answer}
                        question_slug={question.slug}
                      />
                    </div>
                  </Card>
                </article>
              ))
            ) : (
              <article key={question.id}>
                <Card className="group mb-4">
                  {renderQuestionDetails(question)}
                </Card>
              </article>
            )
          )}
      </section>
    </Loading>
  );
}

function renderQuestionDetails(question) {
  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="flex flex-col items-end rounded col-span-9 md:col-span-1 pt-1">
        <div className="text-center mb-2">
          <div className="text-xs text-gray-500">
            {question.vote_count} votes
          </div>
        </div>
        <div className="text-center mb-2">
          <div className="text-xs text-gray-500">
            {question.answer_count} answers
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">
            {question.view_count} views
          </div>
        </div>
      </div>
      <div className="col-span-9 md:col-span-8">
        <Link to={`/questions/question-details?id=${question.slug}`}>
          <div className="flex items-center justify-between mb-2">
            <h5 className="group-hover:underline text-blue-700 font-normal">
              {question.title}
            </h5>
          </div>
        </Link>
        <p>
          {question.body.length > 230
            ? question.body.substring(0, 229) + "..."
            : question.body}
        </p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            {question.tags.map((tag, index) => (
              <Link key={tag} to={`/questions/tagged/${tag}`}>
                <Tag
                  key={index}
                  className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border border-blue-200 rounded mr-1 text-xs font-light"
                >
                  {tag}
                </Tag>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs">
              {question.asked_by} - {dayjs(question.created_at).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkedPosts;
