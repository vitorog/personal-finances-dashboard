import React, { Component } from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";

import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Breadcrumb from "./layout/Breadcrumb";
import Purchases from "./feature/expenses/Expenses";
import Configuration from "./feature/configuration/Configuration";
import Income from "./feature/income/Income";
import Reports from "./feature/reports/Reports";

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
              <div className="column">
                <Breadcrumb />
                <div>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/reports" />}
                  />
                  <Route path="/reports" component={Reports} />
                  <Route path="/income" component={Income} />
                  <Route path="/expenses" component={Purchases} />
                  <Route path="/configuration" component={Configuration} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
