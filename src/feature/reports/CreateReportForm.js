import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

function validateName(value) {
  let error;
  if (!value) {
    error = "Name cannot be empty";
  }
  return error;
}

const CreateReportForm = props => {
  return (
    <Form id={props.formName}>
      <div className="field">
        <label className="label is-pulled-left">Report Name</label>
        <div className="control">
          <Field
            className="input"
            type="text"
            placeholder="Name"
            name="name"
            validate={validateName}
          />
          <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
        </div>
      </div>
      <div className="field">
        <label className="label is-pulled-left">Income Goal</label>
        <div className="control">
          <Field className="input" type="number" placeholder="" name="goal" />
        </div>
      </div>
    </Form>
  );
};

const CreateReportFormWithFormik = props => {
  return (
    <Formik
      initialValues={{
        name: "",
        goal: 0
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.handleSubmit(values);
        setSubmitting(false);
      }}
      render={formikProps => <CreateReportForm {...props} {...formikProps} />}
    />
  );
};

CreateReportForm.propTypes = {
  formName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CreateReportFormWithFormik;
