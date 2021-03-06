import React, { Component } from "react";
import axios from "axios";
import { inject } from "mobx-react";
import Modal from "../../layout/Modal";
import moment from "moment";

const nubankEventsAPI =
  "https://prod-s0-webapp-proxy.nubank.com.br//api/proxy/AJxL5LBXpt2AE_Fgf6VhQySZjwN1QoLoxg.aHR0cHM6Ly9wcm9kLXMwLWZhY2FkZS5udWJhbmsuY29tLmJyL2FwaS9jdXN0b21lcnMvNTRmNzBkMmYtNWYwNS00YjQxLWIyMGEtMGQ2ZGNkYjYzOWVkL2ZlZWQ";

class NubankImporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: "",
      yearFilter: new Date().getFullYear(),
      isModalVisible: false
    };
  }

  handleApiKeyChange = event => {
    this.setState({ apiKey: event.target.value });
  };

  handleYearFilterChange = event => {
    this.setState({ yearFilter: event.target.value });
  };

  handleImport = () => {
    this.toggleModal();
    const auth = `Bearer ${this.state.apiKey}`;
    const options = {
      url: nubankEventsAPI,
      method: "get",
      headers: {
        Authorization: auth
      }
    };
    axios(options)
      .then(response => {
        const expenses = response.data.events
          .filter(event => event.category === "transaction")
          .map(element => {
            return {
              description: element.description,
              value: parseFloat((element.amount / 100.0).toFixed(2)),
              paymentMethod: "Nubank",
              category: "",
              date: moment(element.time, "YYYY-MM-DD hh:mm:ss").toDate(),
              id: element.id,
              details: element.details,
              repeatMonths: 0,
              // TODO: Fix this
              splitMonths: element.details
                ? element.details.charges
                  ? element.details.charges.count
                  : 0
                : 0
            };
          })
          .filter(p => p.date.getFullYear() >= this.state.yearFilter)
          .sort((a, b) => b.date - a.date);
        this.props.finances.addExpenses(expenses);
      })
      .catch(error => {
        //TODO: proper error handling
        console.log(error);
      });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <span className="navbar-item">
        <Modal
          title="Import data from Nubank"
          isVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          footer={
            <React.Fragment>
              <button className="button is-link" onClick={this.toggleModal}>
                Cancel
              </button>
              <button className="button is-link" onClick={this.handleImport}>
                Import
              </button>
            </React.Fragment>
          }
        >
          <label className="label is-pulled-left">API Key</label>
          <textarea
            className="textarea"
            type="textarea"
            onChange={this.handleApiKeyChange}
          />
          <label className="label is-pulled-left">Year Filter</label>
          <input
            className="input"
            type="number"
            defaultValue={this.state.yearFilter}
            onChange={this.handleYearFilterChange}
          />
        </Modal>
        <button className="button is-link" onClick={this.toggleModal}>
          Import from Nubank
        </button>
      </span>
    );
  }
}

export default inject("finances")(NubankImporter);
