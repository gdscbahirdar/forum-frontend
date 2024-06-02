import { Loading } from "components/shared";
import { Tag } from "components/ui";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBadges } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store";
import { useLocation } from "react-router-dom";

injectReducer("userBadges", reducer);

const badgeLevelMapping = {
  1: "Gold",
  2: "Silver",
  3: "Bronze"
};

const badgeColor = {
  Gold: "bg-yellow-300 text-yellow-300",
  Silver: "bg-gray-300 text-gray-300",
  Bronze: "bg-rose-300 text-rose-300"
};

export const Badges = () => {
  const dispatch = useDispatch();
  const badges = useSelector(state => state.userBadges.data.userBadges);
  const loading = useSelector(state => state.userBadges.data.loading);

  const location = useLocation();

  let username = useSelector(state => state.auth.user.username);

  if (!location.pathname.includes("settings")) {
    username = location.pathname.split("/")[2];
  }

  const fetchData = useCallback(() => {
    dispatch(getUserBadges(username));
  }, [dispatch, username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Loading loading={loading && badges?.length !== 0}>
      <div className="p-4">
        {badges.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="mt-6 text-center">
              <p className="text-base">You haven't earned any badges yet.</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div>
    </Loading>
  );
};
