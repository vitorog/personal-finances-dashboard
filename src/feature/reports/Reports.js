import React, { Component } from "react";
import db from "../../utils/database";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";


const StyledSpan = styled.span`
  && {
    margin-left: 10px;
  }
`;

const printCurrency = value => {
  return "R$ " + (value / 100).toFixed(2);
};

class Reports extends Component {
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

    const budgetValue = totalIncome - totalExpenses - goalValue;
    let budget;
    if (budgetValue > 0) {
      budget = budgetValue / totalIncome;
    } else {
      budget = 0;
    }

    const categories = db.get("categories").value();

    const expensesByCategory = new Map();
    expenses.forEach(expense => {
      const category = expense.category;
      const value = expense.value;
      if(!expensesByCategory.has(category)){
        expensesByCategory.set(category, value / 100);
      }else{
        const previousValue = expensesByCategory.get(category);
        expensesByCategory.set(category, previousValue + (value / 100));
      }
    });

    const paymentMethods = db.get("paymentMethods").value();

    const paymentMethodByCategory = new Map();
    expenses.forEach(expense => {
      const paymentMethod = expense.paymentMethod;
      const value = expense.value;
      if(!paymentMethodByCategory.has(paymentMethod)){
        paymentMethodByCategory.set(paymentMethod, value / 100);
      }else{
        const previousValue = paymentMethodByCategory.get(paymentMethod);
        paymentMethodByCategory.set(paymentMethod, previousValue + (value / 100));
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
      ],
    };

    return (
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification is-info">
              <p className="title">Goal</p>
              <p className="title">
                {printCurrency(budgetValue)}
                <StyledSpan className="is-size-5">
                  ({(budget * 100).toFixed(2)}%)
                </StyledSpan>
              </p>
              <p className="subtitle">Budget</p>
              <br/>
              <p className="title">
                {printCurrency(goalValue)}
                <StyledSpan className="is-size-5">
                  ({(goal * 100).toFixed(2)}%)
                </StyledSpan>
              </p>
              <p className="subtitle">Target</p>
            </article>
          </div>
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification is-info">
              <p className="title">Total Income</p>
              <p className="title">{printCurrency(totalIncome)}</p>
              <p className="subtitle">
                Balance: + {printCurrency(balance)}
              </p>
            </article>
            <article className="tile is-child notification is-warning">
              <p className="title">Total Expenses</p>
              <p className="title">
                {printCurrency(totalExpenses)}
                <StyledSpan className="is-size-5">
                  ({(percentExpenses * 100).toFixed(2)}%)
                </StyledSpan>
              </p>
            </article>
          </div>
        </div>
        <div className="columns">
          <div className="column"><Pie data={categoryData} /></div>
          <div className="column"><Pie data={paymentMethodData} /></div>
        </div>
      </div>
    );
  }
}

export default Reports;
