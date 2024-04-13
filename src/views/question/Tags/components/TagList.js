import React, { useEffect } from "react";
import classNames from "classnames";
import GridItem from "./GridItem";
import { Spinner } from "components/ui";
import { getTags } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const TagList = () => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.tags.data.loading);
  const tags = useSelector(state => state.tags.data.tags);
  const { search } = useSelector(state => state.tags.state.query);

  useEffect(() => {
    dispatch(getTags({ search }));
  }, [dispatch, search]);

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
    </div>
  );
};

export default TagList;
