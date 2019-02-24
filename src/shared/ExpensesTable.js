import React from "react";
import SimpleTable from "./SimpleTable";
import { expensesHeaders } from "../feature/expenses/constants";

const ExpensesTable = props => {
  return (
    <SimpleTable
      headers={expensesHeaders}
      data={props.expenses}
      footer={{
        description: "Total",
        value: props.expenses.reduce((accum, p) => accum + Number(p.value), 0),
        type: "currency"
      }}
      onSelectionChange={props.onSelectionChange}
    />
  );
};

export default ExpensesTable;
