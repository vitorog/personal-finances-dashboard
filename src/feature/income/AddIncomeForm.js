import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";

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
      <div className="columns">
        <div className="field column">
          <label className="label is-pulled-left">Value</label>
          <div className="control">
            <NumberFormat
              className="input"
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              value={props.values.value}
              onValueChange={e => props.setFieldValue("value", e.floatValue)}
            />
          </div>
        </div>

        <div className="field column">
          <label className="label is-pulled-left">Date</label>
          <div className="control">
            <DatePicker
              className="input"
              onChange={e => props.setFieldValue("date", e)}
              value={moment(props.values.date).format("YYYY-MM-DD")}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

const AddIncomeFormWithFormik = props => {
  return (
    <Formik
      initialValues={{
        description: "New Income",
        value: 1.0,
        date: moment().toISOString()
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.date = moment(values.date).toISOString();
        props.handleSubmit(values);
        setSubmitting(false);
      }}
      render={formikProps => <AddIncomeForm {...props} {...formikProps} />}
    />
  );
};

AddIncomeForm.propTypes = {
  formName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AddIncomeFormWithFormik;
