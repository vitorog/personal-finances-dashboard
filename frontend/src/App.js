import React, { Component } from "react";
import Sidebar from "./feature/layout/Sidebar";
import Navbar from "./feature/layout/Navbar";
import Breadcrumb from "./feature/layout/Breadcrumb";
import Purchases from "./feature/dashboard/Expenses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <Sidebar />
            </div>
            <div className="column is-9">
              <Breadcrumb />
              <Purchases />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
