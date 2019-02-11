import React, { Component } from "react";
import db from "../../utils/database";

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
    // TODO: Change this reload and use redux instead
    const dbState = JSON.parse(event.target.result);
    db.setState(dbState);
    db.write();
    // TODO: Remove this later ? Adding this just to see the loading spinner
    setTimeout(() => {
      this.setState({ isLoadingFile: false });
      window.location.reload();
    }, 500);
  };

  handleFileSelect = event => {
    const file = event.target.files[0];
    this.setState({ isLoadingFile: true }, () => {
      this.state.fileReader.readAsText(file);
    });
  };

  handleclose = () => {
    if (localStorage.getItem("db") !== null) {
      localStorage.removeItem("db");
      window.location.reload();
    }
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
          <a className="button is-link">
            <span className="icon">
              <i className="fas fa-sync" />
            </span>
            <span>Sync</span>
          </a>
        </span>
        <span className="navbar-item">
          <a className="button is-link" onClick={this.handleclose}>
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

export default FileControls;
