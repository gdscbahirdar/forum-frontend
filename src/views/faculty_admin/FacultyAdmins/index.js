import React from "react";
import { AdaptableCard } from "components/shared";
import FacultyAdminsTable from "./components/FacultyAdminsTable";
import FacultyAdminsTableTools from "./components/FacultyAdminsTableTools";
import { injectReducer } from "store/index";
import reducer from "./store";

import FacultyAdminNewDialog from "./components/FacultyAdminNewDialog";

injectReducer("faculty_admins", reducer);

const FacultyAdmins = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <FacultyAdminsTableTools />
        <FacultyAdminsTable />
        <FacultyAdminNewDialog />
      </AdaptableCard>
    </>
  );
};

export default FacultyAdmins;
