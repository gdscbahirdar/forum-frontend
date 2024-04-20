import React from "react";
import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import { QuestionList } from "./components/QuestionList";

injectReducer("questions", reducer);

const Questions = () => {
  return (
    <>
      <Container>
        <div className="mt-8 px-4">
          <QuestionList />
        </div>
      </Container>
    </>
  );
};

export default Questions;
