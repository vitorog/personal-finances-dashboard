import React, { Component } from "react";
import Card from "../layout/Card";

class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubnakId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubnakId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubnakId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubnakId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubnakId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        },
        {
          description: "Hotmart Guitar Evoluti",
          value: "5700",
          category: "Assinaturas",
          paymentMethod: "Nubank",
          date: "1 jan 2018",
          nubnakId: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <section className="section">
          <Card title="Filtros" />
        </section>
        <section className="section">
          <Card title="Expenses">{this.renderPurchases()}</Card>
        </section>
      </div>
    );
  }

  renderPurchases() {
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <nav className="panel">
                <div>
                  <a
                    onClick={() => {
                      console.log("HERE");
                    }}
                  >
                    Description{" "}
                    <span className="icon">
                      <i className="fa fa-sort-asc" />
                    </span>
                  </a>
                </div>
                <input className="input" />
              </nav>
            </th>
            <th>Value</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Quota</th>
            <th>Comments</th>
            <th>Split</th>
          </tr>
        </thead>
        <tbody>
          {this.state.purchases.map(p => (
            <tr>
              <td>{p.description}</td>
              <td>R$ {(p.value / 100).toFixed(2)}</td>
              <td>{p.category}</td>
              <td>{p.paymentMethod}</td>
              <td>{p.date}</td>
              <td>{p.quota}</td>
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
