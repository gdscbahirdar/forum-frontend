import React from "react";
import { Container, AdaptableCard } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import useQuery from "utils/hooks/useQuery";
import QuestionContent from "./components/QuestionContent";
import OthersQuestion from "./components/OthersQuestion";

injectReducer("questionDetails", reducer);

const QuestionDetail = () => {
  const query = useQuery();
  const id = query.get("id");

  return (
    <Container>
      <AdaptableCard bodyClass="lg:flex gap-4">
        <div className="my-6 max-w-[800px] w-full mx-auto">
          <QuestionContent questionId={id} />
        </div>
        <OthersQuestion questionId={id} />
      </AdaptableCard>
    </Container>
  );
};

export default QuestionDetail;
