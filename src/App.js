import React, { Component } from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Breadcrumb from "./layout/Breadcrumb";
import Purchases from "./feature/expenses/Expenses";
import Configuration from "./feature/configuration/Configuration";
import Income from "./feature/income/Income";
import Reports from "./feature/reports/Reports";

import FinanceStore from "./store/FinanceStore";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <div className="columns">
              <div className="column is-2">
                <Sidebar />
              </div>
              <Provider finances={FinanceStore}>
                <div className="column">
                  <Breadcrumb />
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/income" />}
                  />
                  <Route path="/reports" component={Reports} />
                  <Route path="/income" component={Income} />
                  <Route path="/expenses" component={Purchases} />
                  <Route path="/configuration" component={Configuration} />
                </div>
              </Provider>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
