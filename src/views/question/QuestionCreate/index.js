import React from "react";
import { Container } from "components/shared";
import QuestionCreate from "./QuestionCreate";

const QuestionCreatePage = () => {
  return (
    <div>
      <Container>
        <div className="mt-8 px-4">
          <QuestionCreate />
        </div>
      </Container>
    </div>
  );
};

export default QuestionCreatePage;
