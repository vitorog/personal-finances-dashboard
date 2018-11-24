import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from 'styled-components';
import Dashboard from "./feature/dashboard/Dashboard";
import Sidebar from "./feature/layout/Sidebar";
import Navbar from "./feature/layout/Navbar";
import Breadcrumb from "./feature/layout/Breadcrumb";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <Navbar />
        <div class="container">
          <div class="columns">
            <div class="column is-3"><Sidebar/></div>
            <div class="column is-9">
              <Breadcrumb/>
              <Dashboard/>
            </div>            
          </div>
        </div>
      </div>

    );
  }
}

export default App;
