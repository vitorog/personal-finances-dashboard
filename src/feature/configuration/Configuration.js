import React, { Component } from "react";
import SimpleTable from "../../layout/SimpleTable";
import Card from "../../layout/Card";
import db from "../../utils/database";

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
          <Card
            title="Configure payment methods"
            actions={[
              { text: "Add", icon: "fa-plus", callback: this.toggleAddModal },
              { text: "Remove", icon: "fa-minus", callback: () => {} }
            ]}
          >
            <SimpleTable
              header={["Payment Method"]}
              data={this.state.paymentMethods}
            />
          </Card>
        </div>
        <div className="column">
          <Card
            title="Configure categories"
            actions={[
              { text: "Add", icon: "fa-plus", callback: this.toggleAddModal },
              { text: "Remove", icon: "fa-minus", callback: () => {} }
            ]}
          >
            <SimpleTable header={["Category"]} data={this.state.categories} />
          </Card>
        </div>
      </div>
    );
  }
}

export default Configuration;
