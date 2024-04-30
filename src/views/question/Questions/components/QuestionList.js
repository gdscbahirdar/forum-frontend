import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, setListData } from "../store/dataSlice";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Loading } from "components/shared";
import { Button, Card, Tag } from "components/ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Pagination, Select } from "components/ui";
import cloneDeep from "lodash/cloneDeep";

dayjs.extend(relativeTime);

const QuestionList = props => {
  const { pageSizes } = props;

  const dispatch = useDispatch();

  const data = useSelector(state => state.questions.data.questionList);
  const loading = useSelector(state => state.questions.data.loading);
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.questions.data.listData
  );
  const filterData = useSelector(state => state.questions.data.filterData);

  const { tag } = useParams();

  const location = useLocation();
  let heading;
  if (tag) {
    heading = `Questions Tagged ${tag}`;
  } else {
    if (location.pathname === "/home") {
      heading = "Top Questions";
    } else {
      heading = "All Questions";
    }
  }

  const isTopQuestions = location.pathname === "/home";

  const displayedData = isTopQuestions ? data.slice(0, 10) : data;

  const listData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const onSelectChange = value => {
    const newListData = cloneDeep(listData);
    newListData.pageSize = Number(value);
    newListData.pageIndex = 1;
    dispatch(setListData(newListData));
  };

  const onAddNewQuestion = () => {
    console.log("Add new student");
  };

  const handlePaginationChange = page => {
    if (!loading) {
      const newListData = cloneDeep(listData);
      newListData.pageIndex = page;
      dispatch(setListData(newListData));
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

  // const handleSort = column => {
  //   if (!loading) {
  //     const { id, isSortedDesc, toggleSortBy, clearSortBy } = column;
  //     const sortOrder = isSortedDesc ? "desc" : "asc";
  //     toggleSortBy(!isSortedDesc);
  //     onSort?.({ order: sortOrder, key: id }, { id, clearSortBy });
  //     const newListData = cloneDeep(listData);
  //     newListData.sort = sort;
  //     dispatch(setListData(newListData));
  //     dispatch(setSortedColumn(sortingColumn));
  //   }
  // };

  const fetchData = useCallback(() => {
    dispatch(
      getQuestions({ tag, pageIndex, pageSize, sort, query, filterData })
    );
  }, [dispatch, filterData, pageIndex, pageSize, query, sort, tag]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Loading loading={loading && data?.length !== 0}>
      <section className="max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center">
          <h4 className="mb-6">{heading}</h4>
          <Button
            size="sm"
            className="max-w-md mb-4"
            variant="twoTone"
            icon={<HiOutlinePlusCircle />}
            onClick={onAddNewQuestion}
          >
            Ask Question
          </Button>
        </div>
        {displayedData.map(question => (
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
                  <Link
                    key={question.slug}
                    to={`/questions/question-details?id=${question.slug}`}
                  >
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
                        {question.asked_by} -
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

        {!isTopQuestions && displayedData.length > 0 && (
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
      </section>
    </Loading>
  );
};

QuestionList.defaultProps = {
  pageSizes: [10, 25, 50, 100]
};

export default QuestionList;
