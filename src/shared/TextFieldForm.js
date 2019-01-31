import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const TextFieldForm = props => {
  return (
    <Form id={props.formName}>
      <div className="field">
        <label className="label is-pulled-left">{props.label}</label>
        <div className="control">
          <Field
            className="input"
            type="text"
            placeholder={props.placeholder}
            name={props.fieldName}
            validate={props.validator}
          />
          {props.validator ? (
            <ErrorMessage name={props.fieldName}>
              {msg => <div>{msg}</div>}
            </ErrorMessage>
          ) : null}
        </div>
      </div>
    </Form>
  );
};

const TextFieldFormWithFormik = props => {
  return (
    <Formik
      initialValues={{
        [props.fieldName]: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.handleSubmit(values);
        setSubmitting(false);
      }}
      render={formikProps => <TextFieldForm {...props} {...formikProps} />}
    />
  );
};

TextFieldForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validator: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

TextFieldForm.defaultProps = {
  placeholder: ""
};

export default TextFieldFormWithFormik;
