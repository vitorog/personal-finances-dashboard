import React from "react";
import PropTypes from "prop-types";

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      selectedRows: new Set()
    };
  }

  handleAllCheckboxChange = () => {
    this.setState(
      prevState => ({
        allChecked: !prevState.allChecked
      }),
      () => {
        if (!this.state.allChecked) {
          this.setState(prevState => ({ selectedRows: new Set() }));
        } else {
          this.props.data.forEach((row, idx) => this.handleCheckboxChange(idx));
        }
      }
    );
  };

  handleCheckboxChange = rowNum => {
    if (this.state.allChecked || !this.state.selectedRows.has(rowNum)) {
      this.setState(prevState => {
        const selectedRows = new Set(prevState.selectedRows);
        selectedRows.add(rowNum);
        return {
          selectedRows
        };
      });
    } else {
      this.setState(prevState => {
        const selectedRows = new Set(prevState.selectedRows);
        selectedRows.delete(rowNum);
        return {
          selectedRows
        };
      });
    }
  };

  render() {
    const parseValue = (value, header) => {
      // TODO: Add proper locale
      if (header.type === "currency") {
        return "R$" + (value / 100).toFixed(2);
      }
      return value;
    };

    const renderData = () => {
      return (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th className="is-checkbox-col">
                <input
                  type="checkbox"
                  onChange={this.handleAllCheckboxChange}
                />
              </th>
              {this.props.headers.map(header => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    checked={this.state.selectedRows.has(idx)}
                    onChange={() => this.handleCheckboxChange(idx)}
                  />
                </td>
                {this.props.headers.map((header, idx2) => {
                  const value = header.accessor ? row[header.accessor] : row;
                  return <td key={idx2}>{parseValue(value, header)}</td>;
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
                    {parseValue(this.props.footer[header.accessor], header)}
                  </th>
                ))}
              </tr>
            </tfoot>
          ) : null}
        </table>
      );
    };

    return this.props.data.length > 0 ? (
      renderData()
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
  footer: PropTypes.array
};

SimpleTable.defaultProps = {
  header: ["Empty"],
  data: []
};

export default SimpleTable;
