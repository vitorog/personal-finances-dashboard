import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "../../layout/Modal";
import moment from "moment";
import PropTypes from "prop-types";

function validateDescription(value) {
  let error;
  if (!value) {
    error = "Description cannot be empty";
  }
  return error;
}

const AddIncomeModal = props => {
  const formName = "addIncomeForm";

  const renderForm = () => (
    <Form id={formName}>
      <div className="field">
        <label className="label is-pulled-left">Description</label>
        <div className="control">
          <Field
            className="input"
            type="text"
            placeholder="Description"
            name="description"
            validate={validateDescription}
          />
          <ErrorMessage name="description">
            {msg => <div>{msg}</div>}
          </ErrorMessage>
        </div>
      </div>
      <div className="field">
        <label className="label is-pulled-left">Value</label>
        <div className="control">
          <Field className="input" type="number" placeholder="" name="value" />
        </div>
      </div>

      <div className="field">
        <label className="label is-pulled-left">Date</label>
        <div className="control">
          <Field
            className="input"
            type="date"
            name="date"
            value={props.values.date}
          />
        </div>
      </div>
    </Form>
  );

  return (
    <Modal
      title="Add Income"
      isVisible={props.isVisible}
      toggleModal={props.toggleModal}
      submitButton={
        <button className="button" type="submit" form={formName}>
          Ok
        </button>
      }
    >
      {renderForm()}
    </Modal>
  );
};

const AddIncomeModalFormik = props => {
  return (
    <Formik
      initialValues={{
        description: "",
        value: 0,
        date: moment().format("YYYY-MM-DD")
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.handleAddIncome(values);
        setSubmitting(false);
        props.toggleModal();
      }}
      render={formikProps => <AddIncomeModal {...props} {...formikProps} />}
    />
  );
};

AddIncomeModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleAddIncome: PropTypes.func.isRequired
};

export default AddIncomeModalFormik;
