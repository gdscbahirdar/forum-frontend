import React from "react";
import { AdaptableCard, Container } from "components/shared";
import { injectReducer } from "store/index";
import reducer from "./store";
import FeedbackList from "./FeedbackList";

injectReducer("feedback", reducer);

const Settings = () => {
  return (
    <Container>
      <AdaptableCard>
        <FeedbackList />
      </AdaptableCard>
    </Container>
  );
};

export default Settings;
