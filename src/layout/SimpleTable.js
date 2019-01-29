import React from "react";
import PropTypes from "prop-types";

const SimpleTable = props => {
  const renderData = () => {
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th className="is-checkbox-col">
              <input type="checkbox" />
            </th>
            {props.header.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" />
              </td>
              {/*TODO: Adjust it to make it work with multiple columns properly*/}
              {props.header.map(header => (
                <td key={header}>{row[header.toLowerCase()] ? row[header.toLowerCase()] : row}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {props.footer ? (
          <tfoot>
            <tr>
              {props.header.map(header => (
                <th key={header}>{props.footer[header]}</th>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    );
  };

  return props.data.length > 0 ? (
    renderData()
  ) : (
    <div className="has-text-centered">No data</div>
  );
};

SimpleTable.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  footer: PropTypes.array.isRequired
};

SimpleTable.defaultProps = {
  header: ["Empty"],
  data: []
};

export default SimpleTable;
