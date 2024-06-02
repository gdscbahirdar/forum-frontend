import React from "react";
import ResourceForm from "views/resources/ResourceForm";
import { toast, Notification } from "components/ui";
import { useNavigate } from "react-router-dom";
import { apiCreateResource } from "services/ResourceService";

const ResourceNew = () => {
  const navigate = useNavigate();

  const addResource = async data => {
    const response = await apiCreateResource(data);
    return response.data;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const data = await addResource(values);
    setSubmitting(false);
    if (data) {
      toast.push(
        <Notification
          title={"Successfuly added"}
          type="success"
          duration={2500}
        >
          Resource successfuly added
        </Notification>,
        {
          placement: "top-center"
        }
      );
      navigate(`/resource-details/${data.id}`);
    }
  };

  const handleDiscard = () => {
    navigate("/resource-list");
  };

  return (
    <>
      <ResourceForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        initialData={{
          title: "",
          description: "",
          tags: [],
          categories: [],
          files: []
        }}
      />
    </>
  );
};

export default ResourceNew;
