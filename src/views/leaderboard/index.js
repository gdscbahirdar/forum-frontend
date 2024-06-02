import React, { useEffect } from "react";
import reducer from "./store";
import { injectReducer } from "store/index";
import { Loading } from "components/shared";
import Leads from "./components/Leads";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderBoardData } from "./store/dataSlice";

injectReducer("leaderBoard", reducer);

const LeaderBoard = () => {
  const dispatch = useDispatch();

  const leadsData = useSelector(state => state.leaderBoard.data.leaderBoard);
  const loading = useSelector(state => state.leaderBoard.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    dispatch(getLeaderBoardData());
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={loading}>
        <Leads data={leadsData} />
      </Loading>
    </div>
  );
};

export default LeaderBoard;
