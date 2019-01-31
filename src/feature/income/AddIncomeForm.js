import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import PropTypes from "prop-types";

function validateDescription(value) {
  let error;
  if (!value) {
    error = "Description cannot be empty";
  }
  return error;
}

const AddIncomeForm = props => {
  return (
    <Form id={props.formName}>
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
};

const AddIncomeFormWithFormik = props => {
  return (
    <Formik
      initialValues={{
        description: "",
        value: 0,
        date: moment().format("YYYY-MM-DD")
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("SUBMIT");
        props.handleSubmit(values);
        setSubmitting(false);
      }}
      render={formikProps => <AddIncomeForm {...props} {...formikProps} />}
    />
  );
};

AddIncomeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default AddIncomeFormWithFormik;
