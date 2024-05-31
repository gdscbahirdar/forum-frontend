import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetProfileData } from "services/AccountServices";
import { setUser } from "store/auth/userSlice";

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const fetchProfileData = useCallback(async () => {
    try {
      const profileResponse = await apiGetProfileData();
      dispatch(
        setUser({
          ...user,
          reputation: profileResponse.data.reputation,
          badges: profileResponse.data.badges
        })
      );
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return <>{children}</>;
};

export default UserProvider;
