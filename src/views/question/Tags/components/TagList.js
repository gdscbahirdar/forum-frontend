import React, { useEffect, useMemo } from "react";
import classNames from "classnames";
import GridItem from "./GridItem";
import { Pagination, Select, Spinner } from "components/ui";
import { getTags, setListData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";

const TagList = props => {
  const { pageSizes } = props;

  const dispatch = useDispatch();

  const loading = useSelector(state => state.tags.data.loading);
  const tags = useSelector(state => state.tags.data.tags);
  const { search } = useSelector(state => state.tags.state.query);
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    state => state.tags.data.listData
  );
  const filterData = useSelector(state => state.tags.data.filterData);

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

  useEffect(() => {
    dispatch(getTags({ search, pageIndex, pageSize, sort, query, filterData }));
  }, [dispatch, search, pageIndex, pageSize, sort, query, filterData]);

  return (
    <div
      className={classNames(
        "mt-6 h-full flex flex-col",
        loading && "justify-center"
      )}
    >
      {loading && (
        <div className="flex justify-center">
          <Spinner size={40} />
        </div>
      )}
      {tags?.data?.length > 0 && !loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tags?.data.map(tag => (
            <GridItem key={tag.id} data={tag} />
          ))}
        </div>
      )}
      {tags?.data?.length > 0 && (
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
              value={pageSizeOption.filter(option => option.value === pageSize)}
              options={pageSizeOption}
              onChange={option => handleSelectChange(option.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

TagList.defaultProps = {
  pageSizes: [10, 25, 50]
};

export default TagList;
