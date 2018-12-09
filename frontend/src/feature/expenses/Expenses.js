import React, { Component } from "react";
import Card from "../layout/Card";
import Modal from "../layout/Modal";
import AddExpenseModal from "./AddExpenseModal";
import ExpensesFilters from "./ExpensesFilters";
import styled from "styled-components";

const StyledSection = styled.section`
  && {
    padding: 10px;
  }
`;

class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
      purchases: [
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        }
      ]
    };

    this.toggleAddModal = this.toggleAddModal.bind(this);
  }

  toggleAddModal() {
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });
  }

  render() {
    return (
      <div>
        <StyledSection className="section">
          <ExpensesFilters />
        </StyledSection>
        <StyledSection className="section">
          <Card
            title="Expenses"
            actions={[
              { text: "Add", icon: "fa-plus", callback: this.toggleAddModal },
              { text: "Remove", icon: "fa-minus", callback: () => {} }
            ]}
          >
            {this.renderPurchases()}
          </Card>
        </StyledSection>
        <Modal
          title="Add Expense"
          isVisible={this.state.isAddModalVisible}
          toggleModal={this.toggleAddModal}
        >
          <AddExpenseModal />
        </Modal>
      </div>
    );
  }

  renderPurchases() {
    const total = this.state.purchases.reduce(
      (accum, p) => accum + Number(p.value),
      0
    );

    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Date</th>
            <th># Months</th>
            <th>Comments</th>
            <th>Split</th>
          </tr>
        </thead>
        <tbody>
          {this.state.purchases.map((p, idx) => (
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
              <td>{p.months}</td>
              <td>{p.comments}</td>
              <td>{p.split}</td>
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
            <th />
            <th />
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default Purchases;
