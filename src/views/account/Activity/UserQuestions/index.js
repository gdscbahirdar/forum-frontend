import { Loading } from "components/shared";
import { Card, Pagination, Select, Tag } from "components/ui";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import reducer from "./store";
import { injectReducer } from "store";
import {
  getUserQuestions,
  setListData,
  setQuestionList
} from "./store/dataSlice";

injectReducer("userQuestions", reducer);

dayjs.extend(relativeTime);

const UserQuestions = props => {
  const { pageSizes } = props;

  const dispatch = useDispatch();

  const data = useSelector(state => state.userQuestions.data.questionList);
  const loading = useSelector(state => state.userQuestions.data.loading);
  const { pageIndex, pageSize, total } = useSelector(
    state => state.userQuestions.data.listData
  );

  const location = useLocation();

  let username = useSelector(state => state.auth.user.username);

  if (!location.pathname.includes("settings")) {
    username = location.pathname.split("/")[2];
  }

  const listData = useMemo(
    () => ({ pageIndex, pageSize, total }),
    [pageIndex, pageSize, total]
  );

  const onSelectChange = value => {
    const newListData = cloneDeep(listData);
    newListData.pageSize = Number(value);
    newListData.pageIndex = 1;
    dispatch(setListData(newListData));
  };

  const handlePaginationChange = page => {
    if (!loading) {
      const newListData = cloneDeep(listData);
      newListData.pageIndex = page;
      dispatch(setQuestionList(newListData));
    }
  };

  const handleSelectChange = value => {
    if (!loading) {
      onSelectChange?.(Number(value));
    }
  };

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map(number => ({ value: number, label: `${number} / page` })),
    [pageSizes]
  );

  const fetchData = useCallback(() => {
    dispatch(getUserQuestions({ username, pageIndex, pageSize }));
  }, [dispatch, username, pageIndex, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Loading loading={loading && data?.length !== 0}>
      <div className="p-4">
        {data.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="mt-6 text-center">
              <p className="text-base">You haven't asked any questions yet.</p>
            </div>
          </div>
        )}
        {data.map(question => (
          <article key={question.id}>
            <Card className="group mb-4">
              <div className="grid grid-cols-9 gap-4">
                <div className="flex flex-col items-end rounded col-span-9 md:col-span-1 pt-1">
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500">
                      {question.vote_count} votes
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500">
                      {question.answer_count} answer
                      {question.answer_count > 1 && "s"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      {question.view_count} views
                    </div>
                  </div>
                </div>

                <div className="col-span-9 md:col-span-8">
                  <Link
                    key={question.slug}
                    to={`/questions/question-details?id=${question.slug}`}
                    state={{ id: question.id }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="group-hover:underline text-blue-700 font-normal break-words w-full">
                        {question.title}
                      </h5>
                    </div>
                  </Link>
                  <p className="break-words w-full">
                    {question.body.length > 230
                      ? question.body.substring(0, 229) + "..."
                      : question.body}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      {question.tags &&
                        question.tags.map((tag, index) => (
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
                        <Link to={`/users/${question.asked_by}/summary`}>
                          {question.asked_by}
                        </Link>
                        -
                        <span>
                          {dayjs(question.created_at).isSame(
                            question.updated_at
                          )
                            ? "asked"
                            : "modified"}{" "}
                          {dayjs(question.updated_at).fromNow()}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </article>
        ))}

        {data.length > 10 && (
          <div className="flex items-center justify-between mt-4">
            <Pagination
              pageSize={pageSize}
              currentPage={pageIndex}
              total={total}
              onChange={handlePaginationChange}
            />
            <div style={{ minWidth: 130 }}>
              <Select
                size="sm"
                menuPlacement="top"
                isSearchable={false}
                value={pageSizeOption.filter(
                  option => option.value === pageSize
                )}
                options={pageSizeOption}
                onChange={option => handleSelectChange(option.value)}
              />
            </div>
          </div>
        )}
      </div>
    </Loading>
  );
};

UserQuestions.defaultProps = {
  pageSizes: [10, 25, 50]
};

export default UserQuestions;
