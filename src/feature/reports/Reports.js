import React, { Component } from "react";
import db from "../../utils/database";
import { Pie } from "react-chartjs-2";
import Card from "../../layout/Card";
import Income from "../income/Income";
import Expenses from "../expenses/Expenses";
import Modal from "../../layout/Modal";
import CreateReportFormWithFormik from "./CreateReportForm";
import Select from "../../layout/Select";

const printCurrency = value => {
  return "R$ " + (value / 100).toFixed(2);
};

const printPercentage = value => {
  return (value * 100).toFixed(2) + "%";
};

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateReportModalVisible: false
    };
  }

  toggleCreateReportModal = () =>
    this.setState(prevState => ({
      isCreateReportModalVisible: !prevState.isCreateReportModalVisible
    }));

  handleCreateReport = reportData => {
    db.get("reports").push(reportData).write();
    this.toggleCreateReportModal();
  };

  render() {
    const income = db.get("income").value();
    const totalIncome = income.reduce((accum, p) => accum + Number(p.value), 0);

    const expenses = db.get("expenses").value();
    const totalExpenses = expenses.reduce(
      (accum, p) => accum + Number(p.value),
      0
    );

    const percentExpenses = totalExpenses / totalIncome;

    const balance = totalIncome - totalExpenses;

    const goal = 0.25;
    const goalValue = totalIncome * 0.25;

    const totalBudget = totalIncome - goalValue;
    const budgetValue = totalIncome - totalExpenses - goalValue;

    const categories = db.get("categories").value();

    const expensesByCategory = new Map();
    expenses.forEach(expense => {
      const category = expense.category;
      const value = expense.value;
      if (!expensesByCategory.has(category)) {
        expensesByCategory.set(category, value / 100);
      } else {
        const previousValue = expensesByCategory.get(category);
        expensesByCategory.set(category, previousValue + value / 100);
      }
    });

    const paymentMethods = db.get("paymentMethods").value();

    const paymentMethodByCategory = new Map();
    expenses.forEach(expense => {
      const paymentMethod = expense.paymentMethod;
      const value = expense.value;
      if (!paymentMethodByCategory.has(paymentMethod)) {
        paymentMethodByCategory.set(paymentMethod, value / 100);
      } else {
        const previousValue = paymentMethodByCategory.get(paymentMethod);
        paymentMethodByCategory.set(paymentMethod, previousValue + value / 100);
      }
    });

    const categoryData = {
      labels: Array.from(expensesByCategory.keys()),
      datasets: [
        {
          data: Array.from(expensesByCategory.values()),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    const paymentMethodData = {
      labels: Array.from(paymentMethodByCategory.keys()),
      datasets: [
        {
          data: Array.from(paymentMethodByCategory.values()),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    const incomeDistributionData = {
      labels: ["Expenses", "Remaining", "Goal"],
      datasets: [
        {
          data: [totalExpenses / 100, budgetValue / 100, goalValue / 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    const hasData = income.length > 0 || expenses.length > 0;

    const reports = db
      .get("reports")
      .value()
      .map(report => report.name);

    const createReportFormName = "createReportForm";
    return (
      <div>
        <Modal
          title={"Create Report"}
          isVisible={this.state.isCreateReportModalVisible}
          toggleModal={this.toggleCreateReportModal}
          submitButton={
            <button
              className="button"
              type="submit"
              form={createReportFormName}
            >
              Ok
            </button>
          }
        >
          <CreateReportFormWithFormik
            formName={createReportFormName}
            handleSubmit={this.handleCreateReport}
          />
        </Modal>
        <section className="card-container">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <Select options={reports} handleChange={() => {}}/>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div
                  className="button is-link"
                  onClick={this.toggleCreateReportModal}
                >
                  Create Report
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="card-container">
          <Card title="Summary">
            {hasData ? (
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                      <p className="title">{printCurrency(totalBudget)}</p>
                      <p className="subtitle">Budget</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-warning">
                      <p className="title">{printCurrency(budgetValue)}</p>
                      <p className="subtitle">Remaining</p>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent is-vertical">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-success">
                      <p className="title">{printCurrency(totalIncome)}</p>
                      <p className="subtitle">Income</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-danger">
                      <p className="title">
                        {printCurrency(totalExpenses)}{" "}
                        <span className="is-size-6">
                          ({printPercentage(percentExpenses)})
                        </span>
                      </p>
                      <p className="subtitle">Expenses</p>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent is-vertical">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                      <p className="title">{printCurrency(balance)}</p>
                      <p className="subtitle">Balance</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                      <p className="title">
                        {printCurrency(goalValue)}{" "}
                        <span className="is-size-6">
                          ({printPercentage(goal)})
                        </span>
                      </p>
                      <p className="subtitle">Goal</p>
                    </article>
                  </div>
                </div>
              </div>
            ) : (
              <div className="has-text-centered">No Data</div>
            )}
          </Card>
        </section>
        {hasData ? (
          <section className="card-container">
            {" "}
            <div className="columns" />
            <div className="columns">
              <div className="column">
                <Card title="Income distribution">
                  <Pie data={incomeDistributionData} />
                </Card>
              </div>
              <div className="column">
                <Card title="Expenses by Category">
                  <Pie data={categoryData} />
                </Card>
              </div>
              <div className="column">
                <Card title="Expenses by Payment Method">
                  <Pie data={paymentMethodData} />
                </Card>
              </div>
            </div>
          </section>
        ) : null}
        <Income />
        <Expenses />
      </div>
    );
  }
}

export default Reports;
