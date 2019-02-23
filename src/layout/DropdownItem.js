import React from "react";
import { PropTypes } from "prop-types";

const DropdownActionItem = props => {
  return (
    <a
      className={
        "dropdown-item " + (!props.isActive ? "is-disabled-link disabled" : "")
      }
      onClick={props.callback}
    >
      <span className="icon is-small">
        <i className={props.icon} />
      </span>
      <span>{props.text}</span>
    </a>
  );
};

DropdownActionItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

DropdownActionItem.defaultProps = {
  isActive: true
};

export default DropdownActionItem;
