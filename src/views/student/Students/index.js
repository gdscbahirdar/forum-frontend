import React from "react";
import { AdaptableCard } from "components/shared";
import StudentsTable from "./components/StudentsTable";
import StudentsTableTools from "./components/StudentsTableTools";
import { injectReducer } from "store/index";
import reducer from "./store";

import StudentNewDialog from "./components/StudentNewDialog";
import StudentBulkCreate from "./components/StudentBulkCreate";

injectReducer("students", reducer);

const Students = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <StudentsTableTools />
        <StudentsTable />
        <StudentNewDialog />
        <StudentBulkCreate />
      </AdaptableCard>
    </>
  );
};

export default Students;
