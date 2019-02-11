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
            {this.props.items.map(item => (
              <a
                className={
                  item.isActive === undefined || item.isActive
                    ? "dropdown-item"
                    : "dropdown-item  is-disabled-link disabled"
                }
                onClick={
                  item.isActive === undefined || item.isActive
                    ? item.callback
                    : () => {}
                }
                key={item.text}
              >
                <span className="icon is-small">
                  <i className={"fa " + item.icon} />
                </span>
                <span>{item.text}</span>
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string,
      callback: PropTypes.func.isRequired
    })
  ),
  handleChange: PropTypes.func
};

// Specifies the default values for props:
Dropdown.defaultProps = {
  items: []
};

export default onClickOutside(Dropdown);
