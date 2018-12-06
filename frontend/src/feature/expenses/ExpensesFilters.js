import React from "react";
import Card from "../layout/Card";

const ExpensesFilters = () => {
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
                <input className="input" type="text" placeholder="Text input" />
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
                    <option>Category 1</option>
                    <option>Category 2</option>
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
                    <option>Nubank</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="button">Apply</button>
        <button className="button">Reset</button>
      </div>
    </Card>
  );
};

export default ExpensesFilters;
