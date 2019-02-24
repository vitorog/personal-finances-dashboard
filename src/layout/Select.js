import React from "react";
import PropTypes from "prop-types";

const Select = props => {
  return (
    <div className="select">
      <select
        disabled={props.options.length === 0}
        defaultValue={props.selected}
      >
        {props.options.length > 0 &&
          props.options.map(option => (
            <option key={option.id} onClick={() => props.handleChange(option)}>
              {option.value}
            </option>
          ))}
        {props.options.length === 0 && <option>No data</option>}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  handleChange: PropTypes.func.isRequired
};

export default Select;
