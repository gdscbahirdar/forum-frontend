import React, { useEffect } from "react";
import { Loading, Container, DoubleSidedImage } from "components/shared";
import FacultyAdminProfile from "./components/FacultyAdminProfile";
import { useDispatch, useSelector } from "react-redux";
import { getFacultyAdmin } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store/index";
import isEmpty from "lodash/isEmpty";
import useQuery from "utils/hooks/useQuery";

injectReducer("facultyAdminDetails", reducer);

const FacultyAdminDetail = () => {
  const dispatch = useDispatch();

  const query = useQuery();

  const data = useSelector(state => state.facultyAdminDetails.data.profileData);
  const loading = useSelector(state => state.facultyAdminDetails.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    const id = query.get("id");
    if (id) {
      dispatch(getFacultyAdmin(id));
    }
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(data) && (
          <div className="flex flex-col xl:flex-row gap-4">
            <div>
              <FacultyAdminProfile data={data} />
            </div>
          </div>
        )}
      </Loading>
      {!loading && isEmpty(data) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          />
          <h3 className="mt-8">No user found!</h3>
        </div>
      )}
    </Container>
  );
};

export default FacultyAdminDetail;
