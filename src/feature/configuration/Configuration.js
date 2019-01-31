import React, { Component } from "react";
import db from "../../utils/database";
import DataTable from "../../shared/DataTable";
import TextFieldForm from "../../shared/TextFieldForm";
import NonEmptyFieldValidator from "../../shared/NonEmptyFieldValidator";

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
            addTitle={"Add payment method"}
            dataSource={this.state.paymentMethods}
            headers={[{ name: "Payment Method", accessor: "description" }]}
            footer={null}
            formName={"AddPaymentMethodForm"}
            addForm={
              <TextFieldForm
                placeholder="Payment Method"
                fieldName={"description"}
                validator={NonEmptyFieldValidator}
              />
            }
            syncWithDb={() => {}}
          />
        </div>
        <div className="column">
          <DataTable
            title={"Configure categories"}
            addTitle={"Add category"}
            dataSource={this.state.categories}
            headers={[{ name: "Categories", accessor: "description" }]}
            footer={null}
            formName={"AddCategoryForm"}
            addForm={
              <TextFieldForm placeholder="Category" fieldName={"description"} />
            }
            syncWithDb={() => {}}
          />
        </div>
      </div>
    );
  }
}

export default Configuration;
