import React from "react";
import { ConfirmDialog } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeedbackDeleteConfirmation } from "./store/stateSlice";
import { deleteFeedback } from "./store/dataSlice";

const Confirmations = () => {
  const dispatch = useDispatch();

  const feedbackDeleteConfirmation = useSelector(
    state => state.feedback.state.feedbackDeleteConfirmation
  );
  const selected = useSelector(state => state.feedback.state.selectedFeedback);

  const onFeedbackDeleteConfirmationClose = () => {
    dispatch(toggleFeedbackDeleteConfirmation(false));
  };

  const onFeedbackDeleteConfirm = () => {
    dispatch(deleteFeedback(selected));
    dispatch(toggleFeedbackDeleteConfirmation(false));
    window.location.reload();
  };

  return (
    <>
      <ConfirmDialog
        isOpen={feedbackDeleteConfirmation}
        onClose={onFeedbackDeleteConfirmationClose}
        onRequestClose={onFeedbackDeleteConfirmationClose}
        type="danger"
        title="Delete Feedback"
        onCancel={onFeedbackDeleteConfirmationClose}
        onConfirm={onFeedbackDeleteConfirm}
        confirmButtonColor="red-600"
      >
        <p>Are you sure you want to delete this feedback?</p>
      </ConfirmDialog>
    </>
  );
};

export default Confirmations;
