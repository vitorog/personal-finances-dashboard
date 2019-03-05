import React from "react";
import Card from "../../layout/Card";
import { Pie } from "react-chartjs-2";
import { FormattedNumber } from "react-intl";

class ReportSummary extends React.Component {
  getExpensesByCategory = expenses => {
    const expensesByCategory = new Map();
    expenses.forEach(expense => {
      const category = expense.category ? expense.category : "No category";
      const value = expense.value;
      if (!expensesByCategory.has(category)) {
        expensesByCategory.set(category, value / 100);
      } else {
        const previousValue = expensesByCategory.get(category);
        expensesByCategory.set(category, previousValue + value / 100);
      }
    });
    return expensesByCategory;
  };

  getPaymentMethodByCategory = expenses => {
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
    return paymentMethodByCategory;
  };

  getSummaryData = (income, expenses, goal) => {
    const totalIncome = income.reduce((accum, p) => accum + Number(p.value), 0);

    const totalExpenses = expenses.reduce(
      (accum, p) => accum + Number(p.value),
      0
    );

    const percentExpenses =
      totalIncome > 0 ? totalExpenses / totalIncome : null;

    const balance = totalIncome - totalExpenses;

    const goalValue = totalIncome * goal;

    const totalBudget = totalIncome - goalValue;
    const budgetValue = totalIncome - totalExpenses - goalValue;

    const expensesByCategory = this.getExpensesByCategory(expenses);

    const paymentMethodByCategory = this.getPaymentMethodByCategory(expenses);

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

    return {
      totalIncome,
      totalExpenses,
      percentExpenses,
      balance,
      goal,
      goalValue,
      totalBudget,
      budgetValue,
      expensesByCategory,
      paymentMethodByCategory,
      categoryData,
      paymentMethodData,
      incomeDistributionData,
      hasData
    };
  };

  render() {
    const summaryData = this.getSummaryData(
      this.props.income,
      this.props.expenses,
      this.props.goal
    );

    return (
      <React.Fragment>
        <section className="card-container">
          <Card title="Summary">
            {summaryData.hasData ? (
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                      <p className="title">
                        <FormattedNumber
                          value={summaryData.totalBudget}
                          style="currency"
                          currency="BRL"
                          minimumFractionDigits="2"
                        />{" "}
                      </p>
                      <p className="subtitle">Budget</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-warning">
                      <p className="title">
                        <FormattedNumber
                          value={summaryData.budgetValue}
                          style="currency"
                          currency="BRL"
                          minimumFractionDigits="2"
                        />
                      </p>
                      <p className="subtitle">Remaining</p>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent is-vertical">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-success">
                      <p className="title">
                        <FormattedNumber
                          value={summaryData.totalIncome}
                          style="currency"
                          currency="BRL"
                          minimumFractionDigits="2"
                        />
                      </p>
                      <p className="subtitle">Income</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-danger">
                      <p className="title">
                        <FormattedNumber
                          value={summaryData.totalExpenses}
                          style="currency"
                          currency="BRL"
                          minimumFractionDigits="2"
                        />{" "}
                        {summaryData.percentExpenses && (
                          <span className="is-size-6">
                            <FormattedNumber
                              value={summaryData.percentExpenses}
                              style="percent"
                              minimumFractionDigits="2"
                            />
                          </span>
                        )}
                      </p>
                      <p className="subtitle">Expenses</p>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent is-vertical">
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                      <p className="title">
                        <FormattedNumber
                          value={summaryData.balance}
                          style="currency"
                          currency="BRL"
                          minimumFractionDigits="2"
                        />
                      </p>
                      <p className="subtitle">Balance</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                      <p className="title">
                        <FormattedNumber
                          value={summaryData.goalValue}
                          style="currency"
                          currency="BRL"
                          minimumFractionDigits="2"
                        />{" "}
                        <span className="is-size-6">
                          <FormattedNumber
                            value={summaryData.goal}
                            style="percent"
                            minimumFractionDigits="2"
                          />
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
        {summaryData.hasData && (
          <section className="card-container">
            {" "}
            <div className="columns" />
            <div className="columns">
              <div className="column">
                <Card title="Income distribution">
                  <Pie data={summaryData.incomeDistributionData} />
                </Card>
              </div>
              <div className="column">
                <Card title="Expenses by Category">
                  <Pie data={summaryData.categoryData} />
                </Card>
              </div>
              <div className="column">
                <Card title="Expenses by Payment Method">
                  <Pie data={summaryData.paymentMethodData} />
                </Card>
              </div>
            </div>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default ReportSummary;
