import React, { Component } from "react";

class AddExpenseModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        <div className="field">
          <label className="label is-pulled-left">Description</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Value</label>
          <div className="control">
            <input className="input" type="number" placeholder="" />
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Category</label>
          <div className="control">
            <div className="select">
              <select>
                <option>Category 1</option>
                <option>Category 2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Payment</label>
          <div className="control">
            <div className="select">
              <select>
                <option>Nubank</option>
                <option>Cash</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Date</label>
          <div className="control">
            <input className="input" type="date" />
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left"># Months</label>
          <div className="control">
            <input className="input" type="number" />
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Comments</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Split</label>
          <div className="control">
            <input
              className="input"
              disabled
              type="text"
              placeholder="Text input"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddExpenseModal;
