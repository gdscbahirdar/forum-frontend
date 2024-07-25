import React, { useEffect } from "react";
import { Loading } from "components/shared";
import Statistic from "./Statistic";
import ForumReport from "./ForumReport";
import ForumByCategories from "./ForumByCategories";
import LatestOrder from "./LatestOrder";
import TopProduct from "./TopProduct";
import { getForumDashboardData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { start } from "@popperjs/core";

const ForumDashboardBody = () => {
  const dispatch = useDispatch();

  const statisticData = useSelector(
    state => state.superAdminDashboard.data.dashboardData
  );
  const startDate = useSelector(
    state => state.superAdminDashboard.state.startDate
  );
  const endDate = useSelector(state => state.superAdminDashboard.state.endDate);
  const loading = useSelector(state => state.superAdminDashboard.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    dispatch(getForumDashboardData({ startDate: startDate, endDate: endDate }));
  };

  return (
    <Loading loading={loading}>
      <Statistic data={statisticData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ForumReport
          data={statisticData?.questions_per_day}
          className="col-span-2"
        />
        <ForumByCategories data={statisticData?.top_tags} />
      </div>
      {/*
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LatestOrder data={latestOrderData} className="lg:col-span-2" />
        <TopProduct data={topProductsData} />
      </div> */}
    </Loading>
  );
};

export default ForumDashboardBody;
