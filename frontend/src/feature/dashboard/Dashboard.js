import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section class="hero is-info welcome is-small is-bold">
        <div class="hero-body">
          <div class="container" style={{ textAlign: "left" }}>
            <h1 class="title">Novembro - 2018</h1>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
