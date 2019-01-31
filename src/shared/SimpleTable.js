import React from "react";
import PropTypes from "prop-types";

const SimpleTable = props => {
  const isAllSelected = () => {
    return props.selectedRowsIds.size === props.data.length;
  };

  const handleAllCheckboxChange = () => {
    let selectedRowsIds;
    if (!isAllSelected()) {
      selectedRowsIds = new Set(props.data.map(v => v.id));
    } else {
      selectedRowsIds = new Set();
    }
    props.onSelectionChange(selectedRowsIds);
  };

  const handleCheckboxChange = rowId => {
    const selectedRowsIds = new Set(props.selectedRowsIds);
    if (!selectedRowsIds.has(rowId)) {
      selectedRowsIds.add(rowId);
    } else {
      selectedRowsIds.delete(rowId);
    }
    props.onSelectionChange(selectedRowsIds);
  };

  const parseValue = (value, header) => {
    // TODO: Add proper locale
    if (header.type === "currency") {
      return "R$" + (value / 100).toFixed(2);
    }
    return value;
  };

  const renderData = () => {
    return (
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th className="is-checkbox-col">
                <input
                  type="checkbox"
                  checked={isAllSelected()}
                  onChange={handleAllCheckboxChange}
                />
              </th>
              {props.headers.map(header => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row, idx) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={props.selectedRowsIds.has(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                {props.headers.map((header, idx2) => {
                  const value = header.accessor ? row[header.accessor] : row;
                  return (
                    <td key={row.id + idx2}>{parseValue(value, header)}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          {props.footer ? (
            <tfoot>
              <tr>
                <th />
                {props.headers.map((header, idx) => (
                  <th key={idx}>
                    {parseValue(props.footer[header.accessor], header)}
                  </th>
                ))}
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    );
  };

  return props.data.length > 0 ? (
    renderData()
  ) : (
    <div className="has-text-centered">No data</div>
  );
};

SimpleTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      type: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  selectedRowsIds: PropTypes.object.isRequired,
  footer: PropTypes.object
};

SimpleTable.defaultProps = {
  header: ["Empty"],
  data: [],
  onSelectionChange: () => {}
};

export default SimpleTable;
