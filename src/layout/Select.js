import React from "react";
import PropTypes from "prop-types";

const Select = props => {
  return (
    <div className="select">
      <select>
        {props.options.map(option => (
          <option key={option.id} onClick={() => props.handleChange(option)}>
            {option.value}
          </option>
        ))}
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
