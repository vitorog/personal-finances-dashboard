import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

class Card extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <div className="card-header-title">
            <div className="level">
              <p className="level-item">Test</p>
              <Dropdown className="level-item" title="Actions" actions={this.props.actions}/>
            </div>
          </div>
          <nav className="level">

            <div className="level-right">
              <a
                href="#/"
                className="card-header-icon"
                aria-label="more options"
                onClick={this.toggleCollapse}
              >
              <span className="icon">
                <i
                  className={
                    !this.state.collapsed
                      ? "fa fa-angle-down"
                      : "fa fa-angle-up"
                  }
                  aria-hidden="true"
                />
              </span>
              </a>
            </div>
          </nav>
        </header>
        {!this.state.collapsed ? (
          <div>
            <div className="card-content">
              <div className="content">{this.props.children}</div>
            </div>
            <div className="card-footer">
              {this.props.footerActions.map(action => (
                <a href="#/" className="card-footer-item">
                  {action.text}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired
    })
  ),
  footerActions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired
    })
  )
};

// Specifies the default values for props:
Card.defaultProps = {
  actions: [],
  footerActions: []
};

export default Card;
