import React, { Component } from "react";
import SimpleTable from "./SimpleTable";
import Card from "../layout/Card";
import objectHash from "object-hash";
import Modal from "../layout/Modal";
import PropTypes from "prop-types";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
      selectedRowsIds: new Set(),
      dataSource: props.dataSource,
      headers: props.headers,
      footer: props.footer
    };
  }

  handleAdd = entry => {
    entry.id = objectHash(entry);

    const dataSource = Array.from(this.state.dataSource);
    dataSource.push(entry);

    this.setState({
      dataSource: dataSource
    });
    this.toggleAddModal();
    this.props.syncWithDb(dataSource);
  };

  handleRemove = () => {
    const selectedRowsIds = new Set(this.state.selectedRowsIds);
    if (selectedRowsIds.size > 0) {
      const dataSource = Array.from(
        this.state.dataSource.filter(elem => {
          const shouldKeep = !selectedRowsIds.has(elem.id);
          if (!shouldKeep) {
            selectedRowsIds.delete(elem.id);
          }
          return shouldKeep;
        })
      );

      this.setState({
        dataSource: dataSource,
        selectedRowsIds: selectedRowsIds,
        isAddModalVisible: false
      });
      this.props.syncWithDb(dataSource);
    }
  };

  handleSelectionChange = selectedRowsIds => {
    this.setState({ selectedRowsIds });
  };

  toggleAddModal = () =>
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  renderData() {
    return (
      <SimpleTable
        headers={this.state.headers}
        data={this.state.dataSource}
        footer={this.state.footer}
        onSelectionChange={this.handleSelectionChange}
        selectedRowsIds={this.state.selectedRowsIds}
      />
    );
  }

  render() {
    return (
      <div>
        <Card
          title={this.props.title}
          actions={[
            {
              text: "Add",
              icon: "fa-plus",
              callback: this.toggleAddModal,
              isActive: true
            },
            {
              text: "Remove",
              icon: "fa-minus",
              callback: this.handleRemove,
              isActive: this.state.selectedRowsIds.size > 0
            }
          ]}
        >
          {this.renderData()}
        </Card>
        {this.props.addForm ? (
          <Modal
            title={this.props.addTitle}
            isVisible={this.state.isAddModalVisible}
            toggleModal={this.toggleAddModal}
            submitButton={
              <button
                className="button"
                type="submit"
                form={this.props.formName}
              >
                Ok
              </button>
            }
          >
            {React.cloneElement(this.props.addForm, {
              formName: this.props.formName,
              handleSubmit: this.handleAdd
            })}
          </Modal>
        ) : null}
      </div>
    );
  }
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  addTitle: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  addForm: PropTypes.element.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      type: PropTypes.string
    })
  ).isRequired,
  dataSource: PropTypes.array.isRequired,
  footer: PropTypes.object,
  syncWithDb: PropTypes.func.isRequired
};

export default DataTable;
