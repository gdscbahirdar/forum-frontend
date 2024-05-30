import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "components/shared";
import { toast, Notification } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getResource, updateResource, deleteResource } from "./store/dataSlice";
import ResourceForm from "views/resources/ResourceForm";
import isEmpty from "lodash/isEmpty";

injectReducer("resourcesEdit", reducer);

const ResourceEdit = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const resourceData = useSelector(
    state => state.resourcesEdit.data.resourceData
  );
  const loading = useSelector(state => state.resourcesEdit.data.loading);

  const fetchData = data => {
    dispatch(getResource(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const success = await updateResource({ id, resource: values });
    setSubmitting(false);
    if (success) {
      popNotification("updated");
    }
  };

  const handleDiscard = () => {
    navigate("/resource-list");
  };

  const handleDelete = async setDialogOpen => {
    setDialogOpen(false);
    const success = await deleteResource({ id: resourceData.id });
    if (success) {
      popNotification("deleted");
    }
  };

  const popNotification = keyword => {
    toast.push(
      <Notification
        title={`Successfuly ${keyword}`}
        type="success"
        duration={2500}
      >
        Resource successfuly {keyword}
      </Notification>,
      {
        placement: "top-center"
      }
    );
    navigate(`/resource-details/${resourceData.id}`);
  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    fetchData(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(resourceData) && (
          <>
            <ResourceForm
              type="edit"
              initialData={resourceData}
              onFormSubmit={handleFormSubmit}
              onDiscard={handleDiscard}
              onDelete={handleDelete}
            />
          </>
        )}
      </Loading>
      {!loading && isEmpty(resourceData) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No resource found!"
          />
          <h3 className="mt-8">No resource found!</h3>
        </div>
      )}
    </>
  );
};

export default ResourceEdit;
