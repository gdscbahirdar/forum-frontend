import React from "react";
import CreateUserForm from "./CreateUserForm";

const CreateUser = () => {
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1">Welcome!</h3>
        <p>Please enter your information to create a new user!</p>
      </div>
      <CreateUserForm disableSubmit={false} />
    </>
  );
};

export default CreateUser;
