import React from "react";
import PropTypes from "prop-types";

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      selectedRowsIds: new Set()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.data.length > this.props.data.length) {
      const selectedRowsIds = new Set();
      this.props.onSelectionChange(selectedRowsIds);
      this.setState({selectedRowsIds})
    }
    if (prevState.selectedRowsIds.size !== this.state.selectedRowsIds.size) {
      this.props.onSelectionChange(this.state.selectedRowsIds);
    }
  }

  handleAllCheckboxChange = () => {
    this.setState(
      prevState => ({
        allChecked: !prevState.allChecked
      }),
      () => {
        if (!this.state.allChecked) {
          this.setState(prevState => ({ selectedRowsIds: new Set() }));
        } else {
          const selectedRowsIds = new Set(this.props.data.map(v => v.id));
          this.setState({ selectedRowsIds });
        }
      }
    );
  };

  handleCheckboxChange = rowId => {
    if (this.state.allChecked || !this.state.selectedRowsIds.has(rowId)) {
      this.setState(prevState => {
        const selectedRowsIds = new Set(prevState.selectedRowsIds);
        selectedRowsIds.add(rowId);
        return {
          selectedRowsIds
        };
      });
    } else {
      this.setState(prevState => {
        const selectedRowsIds = new Set(prevState.selectedRowsIds);
        selectedRowsIds.delete(rowId);
        return {
          selectedRowsIds
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
        <div className="table-container">
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
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.selectedRowsIds.has(row.id)}
                      onChange={() => this.handleCheckboxChange(row.id)}
                    />
                  </td>
                  {this.props.headers.map((header, idx2) => {
                    const value = header.accessor ? row[header.accessor] : row;
                    return (
                      <td key={row.id ? row.id + idx2 : idx2}>
                        {parseValue(value, header)}
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
                      {parseValue(this.props.footer[header.accessor], header)}
                    </th>
                  ))}
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
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
  data: [],
  onSelectionChange: () => {
    return;
  }
};

export default SimpleTable;
