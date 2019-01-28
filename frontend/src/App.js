import React, { Component } from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";

import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Breadcrumb from "./layout/Breadcrumb";
import Purchases from "./feature/expenses/Expenses";
import Dashboard from "./feature/dashboard/Dashboard";
import Configuration from "./feature/configuration/Configuration";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <Sidebar />
              </div>
              <div className="column is-9">
                <Breadcrumb />
                <div>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/dashboard" />}
                  />
                  <Route path="/dashboard" component={Dashboard} />
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
