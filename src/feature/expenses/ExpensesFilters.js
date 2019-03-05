import React from "react";
import Card from "../../layout/Card";
import PropTypes from "prop-types";
import { Form, Field, Formik } from "formik";

const ExpensesFilters = props => {
  const {
    values,
    handleChange,
    handleBlur,
    categories,
    paymentMethods,
    handleResetFilters
  } = props;
  return (
    <Card title="Filters">
      <Form>
        <div className="columns">
          <div className="column">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Description</label>
              </div>
              <div className="field-body">
                <div className="control">
                  <Field
                    className="input"
                    type="text"
                    placeholder="Type a description"
                    name="description"
                    value={values.description}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label is-pulled-left">Category</label>
              </div>
              <div className="field-body">
                <div className="control">
                  <div className="select">
                    <select
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label is-pulled-left">Payment</label>
              </div>
              <div className="field-body">
                <div className="control">
                  <div className="select">
                    <select
                      name="paymentMethod"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.paymentMethod}
                    >
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="field column">
            <label className="label is-pulled-left">Start Date</label>
            <div className="control">
              <Field
                className="input"
                type="date"
                name="startDate"
                value={values.startDate}
              />
            </div>
          </div>

          <div className="field column">
            <label className="label is-pulled-left">End Date</label>
            <div className="control">
              <Field
                className="input"
                type="date"
                name="endDate"
                value={values.endDate}
              />
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="button is-info" type="submit">
            Apply
          </button>
          <button
            className="button is-light"
            type="button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </Form>
    </Card>
  );
};

const ExpenseFiltersFormik = props => (
  <Formik
    initialValues={{
      description: "",
      category: props.categories[0],
      paymentMethod: props.paymentMethods[0],
      startDate: "",
      endDate: ""
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      props.handleApplyFilters(values);
    }}
    render={formikProps => <ExpensesFilters {...props} {...formikProps} />}
  />
);

ExpenseFiltersFormik.propTypes = {
  handleApplyFilters: PropTypes.func.isRequired,
  handleResetFilters: PropTypes.func.isRequired
};

export default ExpenseFiltersFormik;
