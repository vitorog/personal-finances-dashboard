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
            <input className="input" type="text" placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Category</label>
          <div className="control">
            <div className="select">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-pulled-left">Payment</label>
          <div className="control">
            <div className="select">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddExpenseModal;
