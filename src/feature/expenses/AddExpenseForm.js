import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";

const AddExpenseForm = props => {
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
          />
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

        <div className="field column">
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
      </div>

      <div className="columns">
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

        <div className="field column">
          <label className="label is-pulled-left">Repeat</label>
          <div className="control">
            <Field className="input" type="number" name="repeatMonths" />
          </div>
        </div>

        <div className="field column">
          <label className="label is-pulled-left">Split</label>
          <div className="control">
            <Field className="input" type="number" name="splitMonths" />
          </div>
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
    </Form>
  );
};

const AddExpenseFormWithFormik = props => {
  return (
    <Formik
      initialValues={{
        description: "New Expense",
        value: 1.0,
        repeatMonths: 0,
        splitMonths: 0,
        category: props.categories[0],
        paymentMethod: props.paymentMethods[0],
        date: moment().format("YYYY-MM-DD")
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.date = moment(values.date).toISOString();
        props.handleSubmit(values);
        setSubmitting(false);
      }}
      render={formikProps => <AddExpenseForm {...props} {...formikProps} />}
    />
  );
};

AddExpenseForm.propTypes = {
  formName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AddExpenseFormWithFormik;
