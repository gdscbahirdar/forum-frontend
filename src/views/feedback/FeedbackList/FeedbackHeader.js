import React from "react";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";

const FeedbackHeader = () => {
  const navigate = useNavigate();

  const onAddFeedback = () => {
    navigate(`/forum/feedback/edit-feedback`);
  };

  return (
    <div className="flex items-center">
      <Button onClick={onAddFeedback} size="sm" variant="solid">
        Add Feedback
      </Button>
    </div>
  );
};

export default FeedbackHeader;
