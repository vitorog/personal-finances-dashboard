import React, { Component } from "react";
import DataTable from "../../shared/DataTable";
import AddIncomeFormWithFormik from "./AddIncomeForm";
import { inject, observer } from "mobx-react";
import { incomeHeaders } from "./constants";

class Income extends Component {
  render() {
    return (
      <section className="card-container">
        <DataTable
          title={"Income"}
          data={this.props.finances.income}
          headers={incomeHeaders}
          footer={{
            description: "Total",
            value: this.props.finances.totalIncome,
            type: "currency"
          }}
          addForm={<AddIncomeFormWithFormik />}
          onAdd={this.props.finances.addIncome}
          onRemove={this.props.finances.removeIncomeByIds}
          onAddToReport={this.props.finances.addIncomeToReport}
        />
      </section>
    );
  }
}

export default inject("finances")(observer(Income));
