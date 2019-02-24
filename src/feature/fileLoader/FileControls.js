import React, { Component } from "react";
import { inject } from "mobx-react";

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
      this.props.finances.clearData();
    }
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
