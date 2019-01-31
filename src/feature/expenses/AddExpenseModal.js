import React from "react";
import { Formik, Form, Field } from "formik";
import Modal from "../../layout/Modal";
import moment from "moment";
import PropTypes from "prop-types";

const AddExpenseModal = props => {
  const formName = "addExpenseForm";

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
          />
        </div>
      </div>
      <div className="field">
        <label className="label is-pulled-left">Value</label>
        <div className="control">
          <Field className="input" type="number" placeholder="" name="value" />
        </div>
      </div>
      <div className="field">
        <label className="label is-pulled-left">Category</label>
        <div className="control">
          <div className="select">
            <select
              name="category"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.category}
            >
              {props.categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label is-pulled-left">Payment</label>
        <div className="control">
          <div className="select">
            <select
              name="paymentMethod"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.payment}
            >
              {props.paymentMethods.map(method => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
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

      <div className="field">
        <label className="label is-pulled-left"># Months</label>
        <div className="control">
          <Field className="input" type="number" name="numMonths" />
        </div>
      </div>

      <div className="field">
        <label className="label is-pulled-left">Comments</label>
        <div className="control">
          <Field
            className="input"
            type="text"
            placeholder="Text input"
            name="comments"
          />
        </div>
      </div>

      <div className="field">
        <label className="label is-pulled-left">Split</label>
        <div className="control">
          <input
            className="input"
            disabled
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>
    </Form>
  );

  return (
    <Modal
      title="Add Expense"
      isVisible={props.isVisible}
      toggleModal={props.toggleModal}
      submitButton={
        <button className="button" type="submit" form={formName}>
          Ok
        </button>
      }
    >
      {renderForm()}
      )}
    </Modal>
  );
};

const AddExpensesModalFormik = props => {
  return (
    <Formik
      initialValues={{
        description: "",
        value: 0,
        numMonths: 1,
        category: props.categories[0],
        paymentMethod: props.paymentMethods[0],
        date: moment().format("YYYY-MM-DD")
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.handleAddExpense(values);
        setSubmitting(false);
        props.toggleModal();
      }}
      render={formikProps => <AddExpenseModal {...props} {...formikProps} />}
    />
  );
};

AddExpenseModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleAddExpense: PropTypes.func.isRequired
};

export default AddExpensesModalFormik;
