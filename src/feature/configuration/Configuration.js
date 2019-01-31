import React, { Component } from "react";
import db from "../../utils/database";
import DataTable from "../../shared/DataTable";

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: db.get("categories").value(),
      paymentMethods: db.get("paymentMethods").value()
    };
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <DataTable
            title={"Configure payment methods"}
            addTitle={""}
            dataSource={this.state.paymentMethods}
            headers={[{ name: "Payment Method", accessor: "description" }]}
            footer={null}
            formName={"AddPaymentMethodForm"}
            addForm={null}
            syncWithDb={() => {}}
          />
        </div>
        <div className="column">
          <DataTable
            title={"Configure "}
            addTitle={""}
            dataSource={this.state.categories}
            headers={[{ name: "Categories", accessor: "description" }]}
            footer={null}
            formName={"AddCategoryForm"}
            addForm={null}
            syncWithDb={() => {}}
          />
        </div>
      </div>
    );
  }
}

export default Configuration;
