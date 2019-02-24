import React from "react";
import Modal from "../layout/Modal";
import Select from "../layout/Select";
import { inject } from "mobx-react";

class ReportSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReport: this.props.finances.reports[0]
    };
  }

  handleSelectedReportChange = option => {
    this.setState({
      selectedReport: this.props.finances.getReportById(option.id)
    });
  };

  handleConfirm = () => this.props.onConfirm(this.state.selectedReport);

  render() {
    return (
      <Modal
        title={"Select Report"}
        isVisible={this.props.isVisible}
        toggleModal={this.props.toggleModal}
        footer={
          <React.Fragment>
            <button className="button" onClick={this.props.toggleModal}>
              Cancel
            </button>
            <button className="button" onClick={this.handleConfirm}>
              Ok
            </button>
          </React.Fragment>
        }
      >
        <Select
          options={this.props.finances.reports.map(report => ({
            id: report.id,
            value: report.name
          }))}
          handleChange={this.handleSelectedReportChange}
        />
      </Modal>
    );
  }
}

export default inject("finances")(ReportSelectorModal);
