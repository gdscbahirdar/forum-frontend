import { Loading } from "components/shared";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { injectReducer } from "store";
import reducer from "views/account/Public/store";
import { getUserProfile } from "views/account/Public/store/dataSlice";

injectReducer("userProfile", reducer);

export const Reputation = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.userProfile.data.userData);
  const loading = useSelector(state => state.userProfile.data.loading);

  const location = useLocation();

  let username = useSelector(state => state.auth.user.username);

  if (!location.pathname.includes("settings")) {
    username = location.pathname.split("/")[2];
  }

  const fetchData = () => {
    dispatch(getUserProfile(username));
  };

  useEffect(() => {
    if (isEmpty(data)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Loading loading={loading && data?.length !== 0}>
      <div className="p-4">
        {data?.reputation} {data?.reputation > 1 ? "Reputations" : "Reputation"}
      </div>
    </Loading>
  );
};
