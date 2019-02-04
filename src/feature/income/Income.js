import React, { Component } from "react";
import DataTable from "../../shared/DataTable";
import AddIncomeFormWithFormik from "./AddIncomeForm";
import db from "../../utils/database";

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: Array.from(db.get("income").value())
    };
  }

  syncWithDb = data => {
    const dbState = db.getState();
    db.setState({ ...dbState, income: data }).write();
    this.setState({ income: Array.from(db.get("income").value()) });
  };

  render() {
    const total = this.state.income.reduce(
      (accum, p) => accum + Number(p.value),
      0
    );
    return (
      <section className="card-container">
        <DataTable
          title={"Income"}
          addTitle={"Add Income"}
          dataSource={this.state.income}
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
      </section>
    );
  }
}

export default Income;
