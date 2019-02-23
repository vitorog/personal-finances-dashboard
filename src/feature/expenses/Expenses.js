import React, { Component } from "react";
import ExpensesFilters from "./ExpensesFilters";
import DataTable from "../../shared/DataTable";
import AddExpenseFormWithFormik from "./AddExpenseForm";
import { inject, observer } from "mobx-react";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: null
    };
  }

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
    const expenses = this.applyFilters(this.props.finances.expenses);
    const hasData = expenses.length > 0;
    const categories = this.props.finances.categories.map(
      elem => elem.description
    );
    const paymentMethods = this.props.finances.paymentMethods.map(
      elem => elem.description
    );
    const total = expenses.reduce((accum, p) => accum + Number(p.value), 0);
    return (
      <React.Fragment>
        <section className="card-container">
          {hasData ? (
            <ExpensesFilters
              categories={categories}
              paymentMethods={paymentMethods}
              handleApplyFilters={this.handleApplyFilters}
              handleResetFilters={this.handleResetFilters}
            />
          ) : null}
        </section>
        <section className="card-container">
          <DataTable
            title="Expenses"
            data={expenses}
            headers={[
              { name: "Description", accessor: "description" },
              { name: "Value", accessor: "value", type: "currency" },
              { name: "Category", accessor: "category" },
              { name: "Payment", accessor: "paymentMethod" },
              { name: "Date", accessor: "date" }
            ]}
            footer={{ description: "Total", value: total, type: "currency" }}
            addForm={
              <AddExpenseFormWithFormik
                categories={categories}
                paymentMethods={paymentMethods}
              />
            }
            onAdd={this.props.finances.addExpense}
            onRemove={this.props.finances.removeExpensesByIds}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default inject("finances")(observer(Expenses));
