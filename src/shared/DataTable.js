import React, { Component } from "react";
import SimpleTable from "./SimpleTable";
import Card from "../layout/Card";
import Modal from "../layout/Modal";
import PropTypes from "prop-types";
import Dropdown from "../layout/Dropdown";
import DropdownItem from "../layout/DropdownItem";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
      selectedRowsIds: new Set()
    };
  }

  handleAdd = entry => {
    this.toggleAddModal();
    this.props.onAdd(entry);
  };

  handleRemove = () => {
    this.props.onRemove(this.state.selectedRowsIds);
    this.setState({ selectedRowsIds: new Set() });
  };

  handleSelectionChange = selectedRowsIds => {
    this.setState({ selectedRowsIds });
  };

  toggleAddModal = () =>
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  getCardActions = () => {
    return (
      <Dropdown title={"Actions"}>
        <DropdownItem
          text="Add"
          icon="fa fa-plus"
          callback={this.toggleAddModal}
        />
        <DropdownItem
          text="Remove"
          icon="fa fa-minus"
          callback={this.handleRemove}
          isActive={this.state.selectedRowsIds.size > 0}
        />
        {this.props.customActions}
      </Dropdown>
    );
  };

  renderData() {
    return (
      <SimpleTable
        headers={this.props.headers}
        data={this.props.data}
        footer={this.props.footer}
        onSelectionChange={this.handleSelectionChange}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <Card title={this.props.title} actionsMenu={this.getCardActions()}>
          {this.renderData()}
        </Card>
        <Modal
          title={"Add " + this.props.title}
          isVisible={this.state.isAddModalVisible}
          toggleModal={this.toggleAddModal}
          footer={
            <React.Fragment>
              <button className="button" onClick={this.toggleAddModal}>
                Cancel
              </button>
              <button className="button" type="submit" form={this.props.title}>
                Ok
              </button>
            </React.Fragment>
          }
        >
          {React.cloneElement(this.props.addForm, {
            formName: this.props.title,
            handleSubmit: this.handleAdd
          })}
        </Modal>
      </React.Fragment>
    );
  }
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  addForm: PropTypes.element.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      type: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  footer: PropTypes.object,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  customActions: PropTypes.element
};

export default DataTable;
