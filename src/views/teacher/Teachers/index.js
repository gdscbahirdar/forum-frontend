import React from "react";
import { AdaptableCard } from "components/shared";
import TeachersTable from "./components/TeachersTable";
import TeachersTableTools from "./components/TeachersTableTools";
import { injectReducer } from "store/index";
import reducer from "./store";

import TeacherNewDialog from "./components/TeacherNewDialog";

injectReducer("teachers", reducer);

const Teachers = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <TeachersTableTools />
        <TeachersTable />
        <TeacherNewDialog />
      </AdaptableCard>
    </>
  );
};

export default Teachers;
