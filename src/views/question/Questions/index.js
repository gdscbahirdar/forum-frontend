import React from "react";
import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import { TopQuestionList } from "./components/TopQuestionList";

injectReducer("questions", reducer);

const Questions = () => {
  return (
    <>
      <Container>
        <div className="mt-8 px-4">
          <TopQuestionList />
        </div>
      </Container>
    </>
  );
};

export default Questions;
