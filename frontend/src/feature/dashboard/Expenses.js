import React, { Component } from "react";
import Card from "../layout/Card";
import Modal from "../layout/Modal";
import AddExpenseModal from "./AddExpenseModal";

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
          nubankId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubankId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubankId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubankId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubankId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubankId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
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
        <section className="section">
          <Card title="Filtros" />
        </section>
        <section className="section">
          <Card
            title="Expenses"
            actions={[
              { text: "Add", icon: "fa-plus", callback: this.toggleAddModal },
              { text: "Remove", icon: "fa-minus" }
            ]}
          >
            {this.renderPurchases()}
          </Card>
        </section>
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
          {this.state.purchases.map(p => (
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <a href="#">{p.description}</a>
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
      </table>
    );
  }
}

export default Purchases;
