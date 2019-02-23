import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDiv = styled.div`
  && {
    margin-left: 1em;
  }
`;

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
      <div className="card animated fadeIn">
        <header className="card-header">
          <div className="card-header-title">
            <div className="level">
              <div className="level-item">{this.props.title}</div>
              <StyledDiv>{this.props.actionsMenu}</StyledDiv>
            </div>
          </div>
          {this.props.canCollapse && (
            <nav className="level">
              <div className="level-right">
                <a
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
          )}
        </header>
        {!this.state.collapsed && (
          <div>
            <div className="card-content">
              <div className="content">{this.props.children}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  canCollapse: PropTypes.bool,
  actionsMenu: PropTypes.element
};

// Specifies the default values for props:
Card.defaultProps = {
  canCollapse: false
};

export default Card;
