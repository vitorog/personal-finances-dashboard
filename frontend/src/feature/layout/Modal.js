import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  render() {
    return (
      <div className={"modal " + (this.props.isVisible ? "is-active" : "")}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.toggleModal}
            />
          </header>
          <section className="modal-card-body">{this.props.children}</section>
          <footer className="modal-card-foot">
            {this.props.buttons.map(btn => (
              <button className="button" onClick={btn.callback} />
            ))}
            <button className="button" onClick={this.props.toggleModal}>
              Close
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  buttons: PropTypes.array
};

Modal.defaultProps = {
  buttons: []
};

export default Modal;
