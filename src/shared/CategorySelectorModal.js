import React from "react";
import Modal from "../layout/Modal";
import Select from "../layout/Select";
import { inject } from "mobx-react";

class CategorySelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: this.props.finances.categories[0]
    };
  }

  handleSelectedCategoryChange = option => {
    this.setState({
      selectedCategory: this.props.finances.getCategoryById(option.id)
    });
  };

  handleConfirm = () => this.props.onConfirm(this.state.selectedCategory);

  render() {
    return (
      <Modal
        title={"Select Category"}
        isVisible={this.props.isVisible}
        toggleModal={this.props.toggleModal}
        footer={
          <React.Fragment>
            <button className="button" onClick={this.props.toggleModal}>
              Cancel
            </button>
            <button className="button" onClick={this.handleConfirm}>
              Ok
            </button>
          </React.Fragment>
        }
      >
        <Select
          options={this.props.finances.categories.map(category => ({
            id: category.id,
            value: category.description
          }))}
          handleChange={this.handleSelectedCategoryChange}
        />
      </Modal>
    );
  }
}

export default inject("finances")(CategorySelectorModal);
