import React from "react";
import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import { BookmarkList } from "./components/BookmarkList";

injectReducer("bookmarks", reducer);

const Questions = () => {
  return (
    <>
      <Container>
        <div className="mt-8 px-4">
          <BookmarkList />
        </div>
      </Container>
    </>
  );
};

export default Questions;
