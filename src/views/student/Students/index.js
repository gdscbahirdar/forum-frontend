import React from "react";
import { AdaptableCard } from "components/shared";
import StudentsTable from "./components/StudentsTable";
import StudentsTableTools from "./components/StudentsTableTools";
import { injectReducer } from "store/index";
import reducer from "./store";

import StudentNewDialog from "./components/StudentNewDialog";

injectReducer("studentStudents", reducer);

const Students = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <StudentsTableTools />
        <StudentsTable />
        <StudentNewDialog />
      </AdaptableCard>
    </>
  );
};

export default Students;
