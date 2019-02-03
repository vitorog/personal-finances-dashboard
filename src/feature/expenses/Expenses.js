import React, { Component } from "react";
import ExpensesFilters from "./ExpensesFilters";
import DataTable from "../../shared/DataTable";
import AddExpenseFormWithFormik from "./AddExpenseForm";
import db from "../../utils/database";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: null,
      expenses: Array.from(db.get("expenses").value())
    };
  }

  syncWithDb = data => {
    const dbState = db.getState();
    db.setState({ ...dbState, expenses: data }).write();
    this.setState({ expenses: Array.from(db.get("expenses").value()) });
  };

  handleApplyFilters = filters => {
    this.setState({ filters });
  };

  handleResetFilters = () => {
    this.setState({ filters: null });
  };

  applyFilters(expenses) {
    const filters = this.state.filters;
    return expenses.filter(p => {
      if (!this.state.filters) {
        return true;
      }

      let result = true;
      for (let key in filters) {
        if (filters.hasOwnProperty(key) && filters[key]) {
          result = result && filters[key] === p[key];
        }
      }
      return result;
    });
  }

  render() {
    const expenses = this.applyFilters(this.state.expenses);
    const categories = db
      .get("categories")
      .value()
      .map(elem => elem.description);
    const paymentMethods = db
      .get("paymentMethods")
      .value()
      .map(elem => elem.description);
    const total = expenses.reduce((accum, p) => accum + Number(p.value), 0);
    return (
      <div>
        <section className="card-container">
          <ExpensesFilters
            categories={categories}
            paymentMethods={paymentMethods}
            handleApplyFilters={this.handleApplyFilters}
            handleResetFilters={this.handleResetFilters}
          />
        </section>
        <section className="card-container">
          <DataTable
            title={"Expenses"}
            addTitle={"Add Expense"}
            dataSource={expenses}
            headers={[
              { name: "Description", accessor: "description" },
              { name: "Value", accessor: "value", type: "currency" },
              { name: "Category", accessor: "category" },
              { name: "Payment", accessor: "paymentMethod" },
              { name: "Date", accessor: "date" }
            ]}
            footer={{ description: "Total", value: total, type: "currency" }}
            formName={"AddExpenseForm"}
            addForm={
              <AddExpenseFormWithFormik
                categories={categories}
                paymentMethods={paymentMethods}
              />
            }
            syncWithDb={this.syncWithDb}
          />
        </section>
      </div>
    );
  }
}

export default Expenses;
