import React, { useEffect } from "react";
import { Container, AdaptableCard } from "components/shared";
import { Button } from "components/ui";
import useQuery from "utils/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import FeedbackForm from "./FeedbackForm";
import reducer from "./store";
import { injectReducer } from "store/index";
import { getFeedback, setFeedback } from "./store/dataSlice";
import { setMode } from "./store/stateSlice";

injectReducer("feedbackEdit", reducer);

const EditArticle = () => {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.feedbackEdit.state.mode);

  const query = useQuery();

  const id = query.get("id");
  const detail = query.get("detail");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    if (id) {
      dispatch(setMode("edit"));
      dispatch(getFeedback(id));
    }

    if (detail === "true") {
      dispatch(setMode("preview"));
      dispatch(setFeedback(""));
    } else if (!id) {
      dispatch(setMode("add"));
      dispatch(setFeedback(""));
    }
  };

  const onModeChange = mode => {
    dispatch(setMode(mode));
  };

  return (
    <Container>
      <AdaptableCard>
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3>
              {mode === "edit" && <span>Edit Feedback</span>}
              {mode === "add" && <span>Add Feedback</span>}
              {mode === "preview" && <span>Preview Feedback</span>}
            </h3>
            {mode === "preview" ? (
              <Button
                onClick={() => onModeChange(id ? "edit" : "add")}
                size="sm"
              >
                Back
              </Button>
            ) : (
              <Button onClick={() => onModeChange("preview")} size="sm">
                Preview
              </Button>
            )}
          </div>
          <FeedbackForm mode={mode} />
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default EditArticle;
