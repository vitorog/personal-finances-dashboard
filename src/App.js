import React, { Component } from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import br from "react-intl/locale-data/br";

import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import Breadcrumb from "./layout/Breadcrumb";
import Purchases from "./feature/expenses/Expenses";
import Configuration from "./feature/configuration/Configuration";
import Income from "./feature/income/Income";
import Reports from "./feature/reports/Reports";

import FinanceStore from "./store/FinanceStore";

addLocaleData([...en, ...br]);

class App extends Component {
  render() {
    return (
      <IntlProvider locale="br">
        <HashRouter>
          <Provider finances={FinanceStore}>
            <div className="App">
              <Navbar />
              <div className="container">
                <div className="columns">
                  <div className="column is-2">
                    <Sidebar />
                  </div>
                  <div className="column">
                    <Breadcrumb />
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
          </Provider>
        </HashRouter>
      </IntlProvider>
    );
  }
}

export default App;
