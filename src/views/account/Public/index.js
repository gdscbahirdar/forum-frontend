import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import reducer from "./store";
import { injectReducer } from "store";
import { getUserProfile } from "./store/dataSlice";
import {
  AdaptableCard,
  Container,
  DoubleSidedImage,
  Loading
} from "components/shared";
import UserProfile from "./UserProfile";
import UserActivity from "./UserActivity";

injectReducer("userProfile", reducer);

const PublicProfile = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.userProfile.data.userData);
  const loading = useSelector(state => state.userProfile.data.loading);

  const location = useLocation();

  let username = location.pathname.split("/")[2];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    dispatch(getUserProfile(username));
  };

  return (
    <Container className="h-full">
      {data?.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          />
          <h3 className="mt-8">No user found!</h3>
        </div>
      ) : (
        <Loading loading={loading}>
          <div className="flex flex-col xl:flex-row gap-4">
            <div>
              <UserProfile data={data} />
            </div>
            <div className="w-full">
              <AdaptableCard>
                <UserActivity username={username} data={data.summary} />
              </AdaptableCard>
            </div>
          </div>
        </Loading>
      )}
    </Container>
  );
};

export default PublicProfile;
