import React from "react";
import ActionBar from "./components/ActionBar";
import TagList from "./components/TagList";
import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";

injectReducer("tags", reducer);

const QuestionsTagList = () => {
  return (
    <Container className="h-full">
      <ActionBar />
      <TagList />
    </Container>
  );
};

export default QuestionsTagList;
