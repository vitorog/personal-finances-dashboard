import React, { Component } from "react";
import Modal from "../../layout/Modal";
import CreateReportFormWithFormik from "./CreateReportForm";
import Select from "../../layout/Select";
import ReportSummary from "./ReportSummary";
import SimpleTable from "../../shared/SimpleTable";
import Card from "../../layout/Card";
import {inject, observer} from "mobx-react";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReport: this.props.finances.reports[0],
      isCreateReportModalVisible: false
    };
  }

  toggleCreateReportModal = () =>
    this.setState(prevState => ({
      isCreateReportModalVisible: !prevState.isCreateReportModalVisible
    }));

  handleCreateReport = reportData => {
    const newReport = { ...reportData, incomeIds: [], expensesIds: [] };
    this.toggleCreateReportModal();
  };

  handleReportChange = selectedReportName => {
    console.log(selectedReportName);
    // this.setState({ selectedReport });
  };

  render() {
    const reportNames = this.props.finances.reports.map(report => report.name);
    const income = this.props.finances.income;
    const expenses = this.props.finances.expenses;
    const createReportFormName = "createReportForm";

    return (
      <div>
        <Modal
          title={"Create Report"}
          isVisible={this.state.isCreateReportModalVisible}
          toggleModal={this.toggleCreateReportModal}
          submitButton={
            <button
              className="button"
              type="submit"
              form={createReportFormName}
            >
              Ok
            </button>
          }
        >
          <CreateReportFormWithFormik
            formName={createReportFormName}
            handleSubmit={this.handleCreateReport}
          />
        </Modal>
        <section className="card-container">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <Select
                  options={reportNames}
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
          goal={this.state.selectedReport.goal}
        />
        <section className="card-container">
          <Card title="Income">
            <SimpleTable
              headers={[
                { name: "Description", accessor: "description" },
                { name: "Value", accessor: "value", type: "currency" },
                { name: "Date", accessor: "date" }
              ]}
              data={income}
              footer={{ description: "Total", value: 0, type: "currency" }}
            />
          </Card>
        </section>
        <section className="card-container">
          <Card title="Expenses">
            <SimpleTable
              headers={[
                { name: "Description", accessor: "description" },
                { name: "Value", accessor: "value", type: "currency" },
                { name: "Category", accessor: "category" },
                { name: "Payment", accessor: "paymentMethod" },
                { name: "Date", accessor: "date" }
              ]}
              footer={{ description: "Total", value: 0, type: "currency" }}
              data={expenses}
            />
          </Card>
        </section>
      </div>
    );
  }
}

export default inject("finances")(observer(Reports));
