import React from "react";
import SimpleTable from "./SimpleTable";
import { incomeHeaders } from "../feature/income/constants";

const IncomeTable = props => {
  return (
    <SimpleTable
      headers={incomeHeaders}
      data={props.income}
      footer={{
        description: "Total",
        value: props.income.reduce((accum, p) => accum + Number(p.value), 0),
        type: "currency"
      }}
      onSelectionChange={props.onSelectionChange}
    />
  );
};

export default IncomeTable;
