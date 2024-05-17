import { Loading } from "components/shared";
import { Tag } from "components/ui";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBadges } from "views/account/store/dataSlice";

const badgeLevelMapping = {
  1: "Gold",
  2: "Silver",
  3: "Bronze"
};

const badgeColor = {
  Gold: "bg-yellow-200 text-yellow-800",
  Silver: "bg-gray-200 text-gray-800",
  Bronze: "bg-orange-200 text-orange-800"
};

export const Badges = () => {
  const dispatch = useDispatch();
  const badges = useSelector(state => state.settings.data.userBadges);
  const loading = useSelector(state => state.settings.data.loading);
  const username = useSelector(state => state.auth.user.username);

  const fetchData = useCallback(() => {
    dispatch(getUserBadges(username));
  }, [dispatch, username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Loading loading={loading && badges?.length !== 0}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 rtl:spcolorace-x-reverse"
          >
            <Tag
              prefix
              prefixClass={`${badgeColor[badgeLevelMapping[badge.level]]}`}
            >
              <span title={badge.description}>{badge.name}</span>
            </Tag>
          </div>
        ))}
      </div>
    </Loading>
  );
};
