import React from "react";
import { AdaptableCard } from "components/shared";
import CustomersTable from "./components/CustomersTable";
import CustomersTableTools from "./components/CustomersTableTools";
import { injectReducer } from "store/index";
import reducer from "./store";

import CustomerNewDialog from "./components/CustomerNewDialog";

injectReducer("crmCustomers", reducer);

const Customers = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <CustomersTableTools />
        <CustomersTable />
        <CustomerNewDialog />
      </AdaptableCard>
    </>
  );
};

export default Customers;
