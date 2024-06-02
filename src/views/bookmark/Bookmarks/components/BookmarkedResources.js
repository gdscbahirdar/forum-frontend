import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookmarkedResources } from "../store/dataSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loading } from "components/shared";
import { Card, Tag } from "components/ui";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

function BookmarkedResources() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.bookmarks.data.bookmarkedResources);
  const loading = useSelector(state => state.bookmarks.data.loading);

  const fetchData = useCallback(() => {
    dispatch(getUserBookmarkedResources());
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
                No bookmarks found. Bookmark a resource to see it here.
              </p>
            </div>
          </div>
        )}
        {data.map(resource => (
          <article key={resource.id}>
            <Card className="group mb-4">
              <div className="grid grid-cols-9 gap-4">
                <div className="flex flex-col items-end rounded col-span-9 md:col-span-1 pt-1">
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500">
                      {resource.vote_count} votes
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      {resource.view_count} views
                    </div>
                  </div>
                </div>
                <div className="col-span-9 md:col-span-8">
                  <Link to={`/resource-details/${resource.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="group-hover:underline text-blue-700 font-normal">
                        {resource.title}
                      </h5>
                    </div>
                  </Link>
                  <p>
                    {resource?.description.length > 230
                      ? resource.description.substring(0, 229) + "..."
                      : resource.description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      {resource.tags.map((tag, index) => (
                        <Link key={tag} to={`/resources/tagged/${tag}`}>
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
                        {resource.user} - {dayjs(resource.created_at).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Card>
          </article>
        ))}
      </section>
    </Loading>
  );
}

export default BookmarkedResources;
