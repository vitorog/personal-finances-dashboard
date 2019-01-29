import React, { Component } from "react";
import Card from "../../layout/Card";
import AddExpenseModal from "./AddExpenseModal";
import ExpensesFilters from "./ExpensesFilters";
import styled from "styled-components";
import db from "../../utils/database";
import objectHash from "object-hash";

const StyledSection = styled.section`
  && {
    padding: 10px;
  }
`;

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
      filters: null
    };
  }

  toggleAddModal = () =>
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  addExpense = expense => {
    expense.id = objectHash(expense);

    db.get("expenses")
      .push(expense)
      .write();
  };

  handleApplyFilters = filters => {
    this.setState({filters});
  };

  handleResetFilters = () => {
    this.setState({filters: null})
  };

  render() {
    const categories = db.get("categories").value();
    const paymentMethods = db.get("paymentMethods").value();
    const filters = this.state.filters;

    const purchases = db.get("expenses").value().filter(p => {
      if(!this.state.filters){
        return true;
      }

      let result = true;
      for(let key in filters){
        if(filters.hasOwnProperty(key) && filters[key]){
          result = result && filters[key] === p[key];
        }
      }
      return result;
    });

    return (
      <div>
        <StyledSection className="section">
          <ExpensesFilters
            categories={categories}
            paymentMethods={paymentMethods}
            handleApplyFilters={this.handleApplyFilters}
            handleResetFilters={this.handleResetFilters}
          />
        </StyledSection>
        <StyledSection className="section">
          <Card
            title={(this.state.filters ? "Filtered " : "") + "Expenses"}
            actions={[
              { text: "Add", icon: "fa-plus", callback: this.toggleAddModal },
              { text: "Remove", icon: "fa-minus", callback: () => {} }
            ]}
          >
            {this.renderPurchases(purchases)}
          </Card>
        </StyledSection>
        <AddExpenseModal
          handleAddExpense={this.addExpense}
          isVisible={this.state.isAddModalVisible}
          toggleModal={this.toggleAddModal}
        />
      </div>
    );
  }

  renderPurchases(purchases) {
    const total = purchases.reduce((accum, p) => accum + Number(p.value), 0);

    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th className="is-checkbox-col">
              <input type="checkbox" />
            </th>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Date</th>
            {/*<th># Months</th>*/}
            {/*<th>Comments</th>*/}
            {/*<th>Split</th>*/}
          </tr>
        </thead>
        <tbody>
          {purchases.map((p, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <a href="#/">{p.description}</a>
              </td>
              <td>R$ {(p.value / 100).toFixed(2)}</td>
              <td>{p.category}</td>
              <td>{p.paymentMethod}</td>
              <td>{p.date}</td>
              {/*<td>{p.months}</td>*/}
              {/*<td>{p.comments}</td>*/}
              {/*<td>{p.split}</td>*/}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th />
            <th>Total</th>
            <th>R$ {(total / 100).toFixed(2)}</th>
            <th />
            <th />
            <th />
            <th />
            {/*<th />*/}
            {/*<th />*/}
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default Expenses;
