import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleCollapse() {
    console.log("HERE");
    console.log(this.state.collapsed);
    this.setState({ collapsed: !this.state.collapsed });
    console.log(this.state.collapsed);
  }

  render() {
    return (
      <div className="card events-card">
        <header className="card-header">
          <p className="card-header-title">{this.props.title}</p>
          <nav className="level">
            <div className="level-item">
              <button className="button">Teste</button>
            </div>
            <a
              href="#"
              className="card-header-icon"
              aria-label="more options"
              onClick={this.toggleCollapse}
            >
              <span className="icon">
                <i className={!this.state.collapsed ? "fa fa-angle-down" : "fa fa-angle-up"} aria-hidden="true" />
              </span>
            </a>
          </nav>
        </header>
        {!this.state.collapsed ? (
          <div>
            <div className="card-table">
              <div className="content">{this.props.children}</div>
            </div>
            <div className="card-footer" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Card;
