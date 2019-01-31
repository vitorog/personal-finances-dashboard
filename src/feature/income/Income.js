import React, { Component } from "react";
import Card from "../../layout/Card";
import db from "../../utils/database";
import SimpleTable from "../../layout/SimpleTable";
import AddIncomeModal from "./AddIncomeModal";
import objectHash from "object-hash";

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
      selectedRowsIds: new Set(),
      income: db.get("income").value()
    };
  }

  handleAddIncome = income => {
    income.id = objectHash(income);

    db.get("income")
      .push(income)
      .write();
  };

  handleRemoveIncome = () => {
    if (this.state.selectedRowsIds.size > 0) {
      db.get("income")
        .remove(item => this.state.selectedRowsIds.has(item.id))
        .write();
      this.setState({ income: db.get("income").value() });
    }
  };

  handleSelectionChange = selectedRowsIds => {
    this.setState({ selectedRowsIds });
  };

  toggleAddModal = () =>
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  render() {
    return (
      <div>
        <section className="card-container">
          <Card
            title={"Income"}
            actions={[
              {
                text: "Add",
                icon: "fa-plus",
                callback: this.toggleAddModal,
                isActive: true
              },
              {
                text: "Remove",
                icon: "fa-minus",
                callback: this.handleRemoveIncome,
                isActive: this.state.selectedRowsIds.size > 0
              }
            ]}
          >
            {this.renderIncome(this.state.income)}
          </Card>
        </section>
        <AddIncomeModal
          handleAddIncome={this.handleAddIncome}
          isVisible={this.state.isAddModalVisible}
          toggleModal={this.toggleAddModal}
        />
      </div>
    );
  }

  renderIncome(income) {
    const total = income.reduce((accum, p) => accum + Number(p.value), 0);
    return (
      <SimpleTable
        headers={[
          { name: "Description", accessor: "description" },
          { name: "Value", accessor: "value", type: "currency" },
          { name: "Date", accessor: "date" }
        ]}
        data={income}
        footer={{ description: "Total", value: total, type: "currency" }}
        onSelectionChange={this.handleSelectionChange}
      />
    );
  }
}

export default Income;
