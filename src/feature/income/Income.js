import React, { Component } from "react";
import DataTable from "../../shared/DataTable";
import AddIncomeFormWithFormik from "./AddIncomeForm";
import db from "../../utils/database";

class Income extends Component {
  syncWithDb = data => {
    const dbState = db.getState();
    db.setState({ ...dbState, income: data }).write();
  };

  render() {
    const income = Array.from(db.get("income").value());
    const total = income.reduce((accum, p) => accum + Number(p.value), 0);
    return (
      <DataTable
        title={"Income"}
        addTitle={"Add Income"}
        dataSource={income}
        headers={[
          { name: "Description", accessor: "description" },
          { name: "Value", accessor: "value", type: "currency" },
          { name: "Date", accessor: "date" }
        ]}
        footer={{ description: "Total", value: total, type: "currency" }}
        formName={"AddIncomeForm"}
        addForm={<AddIncomeFormWithFormik />}
        syncWithDb={this.syncWithDb}
      />
    );
  }
}

export default Income;
