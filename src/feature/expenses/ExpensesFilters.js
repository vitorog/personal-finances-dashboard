import React from "react";
import Card from "../../layout/Card";
import db from "../../utils/database";

const ExpensesFilters = () => {
  const categories = db.get("categories").value();
  const paymentMethods = db.get("paymentMethods").value();
  return (
    <Card title="Filters">
      <div className="columns">
        <div className="column">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Description</label>
            </div>
            <div className="field-body">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Type a description"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label is-pulled-left">Category</label>
            </div>
            <div className="field-body">
              <div className="control">
                <div className="select">
                  <select>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label is-pulled-left">Payment</label>
            </div>
            <div className="field-body">
              <div className="control">
                <div className="select">
                  <select>
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="button is-info">Apply</button>
        <button className="button is-light">Reset</button>
      </div>
    </Card>
  );
};

export default ExpensesFilters;
