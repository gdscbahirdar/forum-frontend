import React from "react";
import { useSelector } from "react-redux";

export const Reputation = () => {
  const reputation = useSelector(state => state.auth.user.reputation);

  return (
    <div className="p-4">
      <h5>{reputation} Reputation</h5>
    </div>
  );
};
