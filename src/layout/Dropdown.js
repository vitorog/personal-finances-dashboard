import React, { Component } from "react";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";

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

  handleClickOutside = evt => {
    this.setState({ isActive: false });
  };

  render() {
    return (
      <div
        className={"dropdown " + (this.state.isActive ? "is-active" : "")}
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
          <div className="dropdown-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func
};

export default onClickOutside(Dropdown);
