import React, { Component } from "react";
import DataTable from "../../shared/DataTable";
import TextFieldForm from "../../shared/TextFieldForm";
import NonEmptyFieldValidator from "../../shared/NonEmptyFieldValidator";
import { inject, observer } from "mobx-react";

class Configuration extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column">
          <DataTable
            title={"Configure payment methods"}
            data={this.props.finances.paymentMethods}
            headers={[{ name: "Payment Method", accessor: "description" }]}
            addForm={
              <TextFieldForm
                placeholder="Payment Method"
                fieldName={"description"}
                validator={NonEmptyFieldValidator}
              />
            }
            onAdd={this.props.finances.addPaymentMethod}
            onRemove={this.props.finances.removePaymentMethodsByIds}
          />
        </div>
        <div className="column">
          <DataTable
            title={"Configure categories"}
            data={this.props.finances.categories}
            headers={[{ name: "Categories", accessor: "description" }]}
            addForm={
              <TextFieldForm placeholder="Category" fieldName={"description"} />
            }
            onAdd={this.props.finances.addCategory}
            onRemove={this.props.finances.removeCategoriesByIds}
          />
        </div>
      </div>
    );
  }
}

export default inject("finances")(observer(Configuration));
