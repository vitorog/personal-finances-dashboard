import React from "react";
import PropTypes from "prop-types";

class SimpleTable extends React.Component {

  isAllSelected = () => {
    return this.props.selectedRowsIds.size === this.props.data.length;
  };

  handleAllCheckboxChange = () => {
    let selectedRowsIds;
    if (!this.isAllSelected()) {
      selectedRowsIds = new Set(this.props.data.map(v => v.id));
    } else {
      selectedRowsIds = new Set();
    }
    this.props.onSelectionChange(selectedRowsIds);
  };

  handleCheckboxChange = rowId => {
    const selectedRowsIds = new Set(this.props.selectedRowsIds);
    if (!selectedRowsIds.has(rowId)) {
      selectedRowsIds.add(rowId);
    } else {
      selectedRowsIds.delete(rowId);
    }
    this.props.onSelectionChange(selectedRowsIds);
  };

  parseValue = (value, header) => {
    // TODO: Add proper locale
    if (header.type === "currency") {
      return "R$" + (value / 100).toFixed(2);
    }
    return value;
  };

  renderData = () => {
    return (
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
          <tr>
            <th className="is-checkbox-col">
              <input
                type="checkbox"
                checked={this.isAllSelected()}
                onChange={this.handleAllCheckboxChange}
              />
            </th>
            {this.props.headers.map(header => (
              <th key={header.name}>{header.name}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {this.props.data.map(row => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={this.props.selectedRowsIds.has(row.id)}
                  onChange={() => this.handleCheckboxChange(row.id)}
                />
              </td>
              {this.props.headers.map((header, idx2) => {
                const value = header.accessor ? row[header.accessor] : row;
                return (
                  <td key={row.id + idx2}>{this.parseValue(value, header)}</td>
                );
              })}
            </tr>
          ))}
          </tbody>
          {this.props.footer ? (
            <tfoot>
            <tr>
              <th />
              {this.props.headers.map((header, idx) => (
                <th key={idx}>
                  {this.parseValue(this.props.footer[header.accessor], header)}
                </th>
              ))}
            </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    );
  };

  render() {
    return this.props.data.length > 0 ? (
      this.renderData()
    ) : (
      <div className="has-text-centered">No data</div>
    );
  }
}

SimpleTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      type: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  selectedRowsIds: PropTypes.object,
  footer: PropTypes.object,
  onSelectionChange: PropTypes.func
};

SimpleTable.defaultProps = {
  header: ["Empty"],
  data: [],
  onSelectionChange: () => {},
  selectedRowsIds: new Set()
};

export default SimpleTable;
