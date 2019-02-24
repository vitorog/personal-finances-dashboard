import React, { Component } from "react";
import Select from "../../layout/Select";
import ReportSummary from "./ReportSummary";
import Card from "../../layout/Card";
import { inject, observer } from "mobx-react";
import CreateReportModal from "./CreateReportModal";
import ExpensesTable from "../../shared/ExpensesTable";
import IncomeTable from "../../shared/IncomeTable";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReport: this.props.finances.reports[0] || null,
      isCreateReportModalVisible: false
    };
  }

  toggleCreateReportModal = () =>
    this.setState(prevState => ({
      isCreateReportModalVisible: !prevState.isCreateReportModalVisible
    }));

  handleReportChange = selectedOption => {
    this.setState({
      selectedReport: this.props.finances.getReportById(selectedOption.id)
    });
  };

  handleCreateReport = report => {
    this.props.finances.addReport(report);
    this.setState({
      selectedReport: report
    });
    this.toggleCreateReportModal();
  };

  render() {
    let income = [];
    let expenses = [];
    if (this.state.selectedReport !== null) {
      income = this.props.finances.getIncomeByIds(
        this.state.selectedReport.incomeIds
      );
      expenses = this.props.finances.getExpensesByIds(
        this.state.selectedReport.expensesIds
      );
    }

    return (
      <React.Fragment>
        <CreateReportModal
          isVisible={this.state.isCreateReportModalVisible}
          income={this.props.finances.income}
          expenses={this.props.finances.expenses}
          toggleModal={this.toggleCreateReportModal}
          onCreateReport={this.handleCreateReport}
        />
        <section className="card-container">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <Select
                  options={this.props.finances.reports.map(report => ({
                    id: report.id,
                    value: report.name
                  }))}
                  handleChange={this.handleReportChange}
                />
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div
                  className="button is-link"
                  onClick={this.toggleCreateReportModal}
                >
                  Create Report
                </div>
              </div>
            </div>
          </div>
        </section>
        <ReportSummary
          income={income}
          expenses={expenses}
          goal={
            this.state.selectedReport ? this.state.selectedReport.goal : null
          }
        />
        <section className="card-container">
          <Card title="Income">
            <IncomeTable income={income} />
          </Card>
        </section>
        <section className="card-container">
          <Card title="Expenses">
            <ExpensesTable expenses={expenses} />
          </Card>
        </section>
      </React.Fragment>
    );
  }
}

export default inject("finances")(observer(Reports));
