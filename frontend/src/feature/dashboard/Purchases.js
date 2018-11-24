import React, { Component } from "react";

class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uncategorizedPurchases: [],
      purchases: []
    };
  }

  render() {
    return (
      <div>
        {this.renderUncategorizedPurchases()} {this.renderPurchases()}
      </div>
    );
  }

  renderUncategorizedPurchases() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Quota</th>
            <th>Comments</th>
            <th>Split</th>
          </tr>
        </thead>
        <tbody>
          {this.state.purchases.map(p => (
            <tr>
              <td>p.description</td>
              <td>p.value</td>
              <td>p.category</td>
              <td>p.paymentMethod</td>
              <td>p.date</td>
              <td>p.quota</td>
              <td>p.comments</td>
              <td>p.split</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderPurchases() {
    return (
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Quota</th>
            <th>Comments</th>
            <th>Split</th>
          </tr>
        </thead>
        <tbody>
          {this.state.purchases.map(p => (
            <tr>
              <td>p.description</td>
              <td>p.value</td>
              <td>p.category</td>
              <td>p.paymentMethod</td>
              <td>p.date</td>
              <td>p.quota</td>
              <td>p.comments</td>
              <td>p.split</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Purchases;
