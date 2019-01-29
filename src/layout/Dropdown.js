import React, { Component } from "react";
import PropTypes from "prop-types";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    return (
      <div
        className={this.state.isActive ? "dropdown is-active" : "is-active"}
        onClick={this.toggleDropdown}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{this.props.title}</span>
            <span className="icon is-small">
              <i className="fa fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.props.actions.map(action => (
              <a
                className="dropdown-item"
                onClick={action.callback}
                key={action.text}
              >
                <span className="icon is-small">
                  <i className={"fa " + action.icon} />
                </span>
                <span>{action.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired
    })
  )
};

// Specifies the default values for props:
Dropdown.defaultProps = {
  actions: []
};

export default Dropdown;
