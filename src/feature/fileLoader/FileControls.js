import React, {Component} from "react";

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
    console.log(event.target.result);
    // TODO: Remove this later ? Adding this just to see the loading spinner
    setTimeout(() => {
      this.setState({isLoadingFile: false});
    }, 500)
  };

  handleFileSelect = event => {
    const file = event.target.files[0];
    this.setState({isLoadingFile: true}, () => {
      this.state.fileReader.readAsText(file);
    });
  };


  render() {
    const isLoading = this.state.isLoadingFile ? "is-loading" : "";
    return (
      <div className="navbar-end">
          <span className="navbar-item">
            <a className={"button is-link " + isLoading} onClick={() => this.inputOpenFileRef.current.click()}>
              <span className="icon">
                <i className="fas fa-file-upload" />
              </span>
              <span>Load</span>
              <input ref={this.inputOpenFileRef} type="file" style={{display:"none"}} onChange={this.handleFileSelect}/>
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
      </div>
    );
  }
}

export default FileControls;
