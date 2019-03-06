import React, { Component } from "react";
import SimpleTable from "./SimpleTable";
import Card from "../layout/Card";
import Modal from "../layout/Modal";
import PropTypes from "prop-types";
import Dropdown from "../layout/Dropdown";
import DropdownItem from "../layout/DropdownItem";
import ReportSelectorModal from "./ReportSelectorModal";
import Pagination from "../layout/Pagination";
import CategorySelectorModal from "./CategorySelectorModal";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
      isSelectReportModalVisible: false,
      isSelectCategoryModalVisible: false,
      selectedRowsIds: new Set(),
      sort: null,
      pagination: {
        entriesPerPage: 25,
        numPages: 1,
        currentPage: 1
      }
    };
  }

  componentDidMount() {
    this.calculatePagination();
  }

  calculatePagination() {
    const pagination = {
      entriesPerPage: 25,
      numPages: 1,
      currentPage: 1
    };
    if (this.props.data.length > this.state.pagination.entriesPerPage) {
      const numPages =
        this.props.data.length / this.state.pagination.entriesPerPage;
      pagination.numPages = Math.ceil(numPages);
    }
    this.setState({ pagination });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length !== this.props.data.length) {
      this.calculatePagination();
    }
  }

  handleAdd = entry => {
    this.toggleAddModal();
    this.props.onAdd(entry);
  };

  handleRemove = () => {
    this.props.onRemove(Array.from(this.state.selectedRowsIds));
    this.setState({ selectedRowsIds: new Set() });
  };

  handleAddToReport = report => {
    this.props.onAddToReport(report, this.state.selectedRowsIds);
    this.toggleSelectReport();
  };

  handleSetCategory = category => {
    this.props.onSetCategory(category, this.state.selectedRowsIds);
    this.toggleSelectCategory();
  };

  handleSelectionChange = selectedRowsIds => {
    this.setState({ selectedRowsIds });
  };

  handleSort = property => {
    let direction = "asc";
    if (this.state.sort !== null) {
      const currDir = this.state.sort.direction;
      if (currDir === "asc") {
        direction = "desc";
      }
    }
    this.setState({
      sort: { property: property, direction: direction }
    });
  };

  toggleAddModal = () =>
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  toggleSelectReport = () =>
    this.setState({
      isSelectReportModalVisible: !this.state.isSelectReportModalVisible
    });

  toggleSelectCategory = () => {
    this.setState({
      isSelectCategoryModalVisible: !this.state.isSelectCategoryModalVisible
    });
  };

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
        {this.props.onAddToReport && (
          <DropdownItem
            text="Add to report"
            icon="fa fa-plus"
            callback={this.toggleSelectReport}
            isActive={this.state.selectedRowsIds.size > 0}
          />
        )}
        {this.props.onSetCategory && (
          <DropdownItem
            text="Set category"
            icon="fa fa-plus"
            callback={this.toggleSelectCategory}
            isActive={this.state.selectedRowsIds.size > 0}
          />
        )}
        {this.props.customActions}
      </Dropdown>
    );
  };

  goToPage = page => {
    if (page <= 0 || page > this.state.numPages) {
      return;
    }
    const pagination = { ...this.state.pagination };
    pagination.currentPage = page;
    this.setState({ pagination });
  };

  renderData() {
    const data = this.applyPagination(this.applySorting(this.props.data));
    console.log(data);

    return (
      <React.Fragment>
        <SimpleTable
          isSortable={true}
          sort={this.state.sort}
          onSortChange={this.handleSort}
          headers={this.props.headers}
          data={data}
          footer={this.props.footer}
          onSelectionChange={this.handleSelectionChange}
        />
        {data.length > 0 && this.state.pagination.numPages > 1 && (
          <Pagination
            pagination={this.state.pagination}
            onPageChange={this.goToPage}
          />
        )}
      </React.Fragment>
    );
  }

  applySorting(data) {
    return this.state.sort
      ? data.sort((a, b) => {
          if (this.state.sort.direction === "asc") {
            return a[this.state.sort.property] > b[this.state.sort.property];
          } else {
            return a[this.state.sort.property] < b[this.state.sort.property];
          }
        })
      : data;
  }

  applyPagination(data) {
    const startIdx =
      (this.state.pagination.currentPage - 1) *
      this.state.pagination.entriesPerPage;
    const endIdx = startIdx + this.state.pagination.entriesPerPage;
    return data.slice(startIdx, endIdx);
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
        <ReportSelectorModal
          title={"Select Report"}
          isVisible={this.state.isSelectReportModalVisible}
          toggleModal={this.toggleSelectReport}
          onConfirm={this.handleAddToReport}
        />
        <CategorySelectorModal
          title={"Select Category"}
          isVisible={this.state.isSelectCategoryModalVisible}
          toggleModal={this.toggleSelectCategory}
          onConfirm={this.handleSetCategory}
        />
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
  onAddToReport: PropTypes.func,
  onSetCategory: PropTypes.func,
  customActions: PropTypes.element
};

export default DataTable;
