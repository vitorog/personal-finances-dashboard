import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Sidebar from "./feature/layout/Sidebar";
import Navbar from "./feature/layout/Navbar";
import Breadcrumb from "./feature/layout/Breadcrumb";
import Purchases from "./feature/expenses/Expenses";
import Dashboard from "./feature/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
