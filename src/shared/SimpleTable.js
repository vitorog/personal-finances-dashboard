import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { FormattedDate, FormattedNumber } from "react-intl";

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowsIds: new Set()
    };
  }

  componentDidUpdate(prevProps) {
    // If entries were removed, it means we can clear the checked items (only checked items can be removed)
    if (this.props.data.length < prevProps.data.length) {
      this.setState({ selectedRowsIds: new Set() });
    }
  }

  isAllSelected = () => {
    return this.props.data.every(elem =>
      this.state.selectedRowsIds.has(elem.id)
    );
  };

  handleAllCheckboxChange = () => {
    let selectedRowsIds;
    if (!this.isAllSelected()) {
      selectedRowsIds = new Set(this.props.data.map(v => v.id));
    } else {
      selectedRowsIds = new Set();
    }
    this.setState({ selectedRowsIds });
    this.props.onSelectionChange(selectedRowsIds);
  };

  handleCheckboxChange = rowId => {
    const selectedRowsIds = new Set(this.state.selectedRowsIds);
    if (!selectedRowsIds.has(rowId)) {
      selectedRowsIds.add(rowId);
    } else {
      selectedRowsIds.delete(rowId);
    }
    this.setState({ selectedRowsIds });
    this.props.onSelectionChange(selectedRowsIds);
  };

  parseValue = (value, header) => {
    if (!value) {
      return "";
    }
    if (header.type === "currency") {
      return (
        <FormattedNumber
          value={value}
          style="currency"
          currency="BRL"
          minimumFractionDigits={2}
        />
      );
    }
    if (header.type === "date") {
      return <FormattedDate value={value} />;
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
                <th key={header.name}>
                  {this.props.isSortable ? (
                    <a
                      className="is-text"
                      onClick={() => this.props.onSortChange(header.accessor)}
                    >
                      {header.name}{" "}
                      {this.props.sort &&
                        this.props.sort.property === header.accessor &&
                        this.props.sort.direction === "asc" && (
                          <i className="fa fa-sort-up" />
                        )}
                      {this.props.sort &&
                        this.props.sort.property === header.accessor &&
                        this.props.sort.direction === "desc" && (
                          <i className="fa fa-sort-down" />
                        )}
                    </a>
                  ) : (
                    header.name
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(row => (
              <tr key={row.id}>
                {this.state.selectedRowsIds && (
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.selectedRowsIds.has(row.id)}
                      onChange={() => this.handleCheckboxChange(row.id)}
                    />
                  </td>
                )}
                {this.props.headers.map((header, idx2) => {
                  const value = header.accessor ? row[header.accessor] : row;
                  return (
                    <td key={row.id + idx2}>
                      {this.parseValue(value, header)}
                    </td>
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
                    {this.parseValue(
                      this.props.footer[header.accessor],
                      header
                    )}
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
  isSortable: PropTypes.bool,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      type: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  footer: PropTypes.object,
  onSelectionChange: PropTypes.func,
  onSortChange: PropTypes.func
};

SimpleTable.defaultProps = {
  isSortable: false,
  header: ["Empty"],
  data: [],
  onSelectionChange: () => {},
  onSortChange: () => {}
};

// This is required, because SimpleTable renders observable components
export default observer(SimpleTable);
