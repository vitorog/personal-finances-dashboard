import React, { Component } from "react";
import CreateReportFormWithFormik from "./CreateReportForm";
import Modal from "../../layout/Modal";
import Card from "../../layout/Card";
import ExpensesTable from "../../shared/ExpensesTable";
import IncomeTable from "../../shared/IncomeTable";

class CreateReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      reportName: null,
      reportGoal: null,
      incomeIds: [],
      expensesIds: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible && !this.props.isVisible) {
      this.setState({
        currentStep: 0,
        reportName: null,
        reportGoal: null,
        incomeIds: [],
        expensesIds: []
      });
    }
  }

  nextStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  backStep = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  handleReportInfoSetup = reportInfo => {
    this.setState({
      reportName: reportInfo.name,
      reportGoal: reportInfo.goal
    });
    this.nextStep();
  };

  handleIncomeSelectionChange = ids => {
    this.setState({ incomeIds: ids });
  };

  handleExpensesSelectionChange = ids => {
    this.setState({ expensesIds: ids });
  };

  createReport = () => {
    const report = {
      name: this.state.reportName,
      goal: this.state.reportGoal / 100.0,
      incomeIds: Array.from(this.state.incomeIds),
      expensesIds: Array.from(this.state.expensesIds)
    };
    this.props.onCreateReport(report);
  };

  render() {
    const createReportFormName = "createReportForm";

    let footer = null;
    switch (this.state.currentStep) {
      case 0:
        footer = (
          <React.Fragment>
            <button className="button" onClick={this.toggleModal}>
              Close
            </button>
            <button
              className="button"
              type="submit"
              form={createReportFormName}
            >
              Next
            </button>
          </React.Fragment>
        );
        break;
      case 1:
        footer = (
          <React.Fragment>
            <button className="button" onClick={this.backStep}>
              Back
            </button>
            <button className="button" onClick={this.nextStep}>
              Next
            </button>
          </React.Fragment>
        );
        break;
      case 2:
        footer = (
          <React.Fragment>
            <button className="button" onClick={this.backStep}>
              Back
            </button>
            <button className="button" onClick={this.createReport}>
              Create Report
            </button>
          </React.Fragment>
        );
        break;
      default:
        break;
    }

    return (
      <Modal
        title={"Create Report"}
        isVisible={this.props.isVisible}
        toggleModal={this.props.toggleModal}
        footer={footer}
      >
        {this.state.currentStep === 0 && (
          <CreateReportFormWithFormik
            formName={createReportFormName}
            handleSubmit={this.handleReportInfoSetup}
          />
        )}
        {this.state.currentStep === 1 && (
          <Card title="Select Income">
            <IncomeTable
              income={this.props.income}
              onSelectionChange={this.handleIncomeSelectionChange}
            />
          </Card>
        )}
        {this.state.currentStep === 2 && (
          <Card title="Select Expenses">
            <ExpensesTable
              expenses={this.props.expenses}
              onSelectionChange={this.handleExpensesSelectionChange}
            />
          </Card>
        )}
      </Modal>
    );
  }
}

export default CreateReportModal;
