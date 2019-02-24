import React, { Component } from "react";
import { inject } from "mobx-react";
import { deepObserve } from "mobx-utils";

const demoData = {
  income: [
    {
      id: "1",
      description: "Salary",
      value: 10000,
      date: "1 jan de 2018"
    },
    {
      id: "2",
      description: "Salary",
      value: 10000,
      date: "1 feb de 2018"
    }
  ],
  expenses: [
    {
      description: "Hotmart Guitar Evoluti",
      value: "5700",
      category: "Subscriptions",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    },
    {
      description: "Sandwich",
      value: "3600",
      category: "Food",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a2515"
    }
  ],
  reports: [
    {
      name: "Example Report",
      goal: 25,
      incomeIds: ["1", "2"],
      expensesIds: ["5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995", "5a4a2515"],
      id: "ab032ff4778ca9e58123edc622b963e52b53a6e8"
    }
  ],
  categories: [
    { id: 0, description: "Fixed" },
    { id: 1, description: "Subscriptions" },
    { id: 2, description: "Food" },
    { id: 3, description: "Transportation" }
  ],
  paymentMethods: [
    { id: 0, description: "Cash" },
    { id: 1, description: "Nubank" }
  ]
};

class FileControls extends Component {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef();
    this.state = {
      fileReader: new FileReader(),
      isLoadingFile: false,
      isSyncingFile: false
    };
    this.state.fileReader.onloadend = this.handleFileLoadEnd;

    if (localStorage.getItem("financesData") !== null) {
      const financesData = JSON.parse(localStorage.getItem("financesData"));
      this.props.finances.setData(financesData);
    } else {
      // Adding this just as demonstration
      console.log("Loading demo data.");
      this.props.finances.setData(demoData);
    }

    //TODO: Check performance of doing this with large datasets
    deepObserve(this.props.finances.data, this.saveToLocalStorage());
  }

  handleFileLoadEnd = event => {
    const financesData = JSON.parse(event.target.result);
    localStorage.setItem("financesData", event.target.result);
    this.props.finances.setData(financesData);
    // TODO: Remove this later ? Adding this just to see the loading spinner
    setTimeout(() => {
      this.setState({ isLoadingFile: false });
    }, 500);
  };

  handleFileSelect = event => {
    const file = event.target.files[0];
    this.setState({ isLoadingFile: true }, () => {
      this.state.fileReader.readAsText(file);
    });
  };

  handleClose = () => {
    if (localStorage.getItem("financesData") !== null) {
      localStorage.removeItem("financesData");
    }
    this.props.finances.clearData();
  };

  handleSave = () => {
    //TODO: Is there a better way to download the file?
    const data = this.props.finances.getData();
    const blob = new Blob([JSON.stringify(data)], { type: "text/json" });
    const link = document.createElement("a");
    link.download = "finances.json";
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  saveToLocalStorage = () => {
    localStorage.setItem("financesData", JSON.stringify(this.props.finances.data));
  };

  render() {
    const isLoading = this.state.isLoadingFile ? "is-loading" : "";
    return (
      <div className="navbar-end">
        <span className="navbar-item">
          <a
            className={"button is-link " + isLoading}
            onClick={() => this.inputOpenFileRef.current.click()}
          >
            <span className="icon">
              <i className="fas fa-file-upload" />
            </span>
            <span>Load</span>
            <input
              ref={this.inputOpenFileRef}
              type="file"
              style={{ display: "none" }}
              onChange={this.handleFileSelect}
            />
          </a>
        </span>
        <span className="navbar-item">
          <a className="button is-link" onClick={this.handleSave}>
            <span className="icon">
              <i className="fas fa-save" />
            </span>
            <span>Save</span>
          </a>
        </span>
        <span className="navbar-item">
          <a className="button is-link" onClick={this.handleClose}>
            <span className="icon">
              <i className="fas fa-lock" />
            </span>
            <span>Close</span>
          </a>
        </span>
      </div>
    );
  }
}

export default inject("finances")(FileControls);
