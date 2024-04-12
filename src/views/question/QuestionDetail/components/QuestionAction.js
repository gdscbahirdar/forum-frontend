import React, { useRef } from "react";
import { Button, Input } from "components/ui";

const QuestionAction = () => {
  const commentInput = useRef();

  const onCommentSubmit = () => {
    console.log(commentInput.current.value);
    commentInput.current.value = "";
  };

  return (
    <>
      <div className="mt-12">
        <h3 className="mb-4">Comments</h3>
        <Input
          ref={commentInput}
          placeholder="Enter your comment here..."
          textArea
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={onCommentSubmit} variant="solid">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuestionAction;
