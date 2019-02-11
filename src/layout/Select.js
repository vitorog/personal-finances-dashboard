import React from "react";
import PropTypes from 'prop-types';

const Select = (props) => {
  return (<div className="select">
    <select>
      {props.options.map(option => <option key={option} onClick={() => props.handleChange(option)}>{option}</option>)}
    </select>
  </div>)
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Select;
