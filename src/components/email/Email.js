/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '@boldcommerce/stacks-ui';
import './Email.css';

const EmailField = ({
  customer,
  dispatch,
  errors,
  submit,
}) => (
  <section className="FieldSet FieldSet--CustomerInformation">
    <div className="FieldSet__Header">
      <div className="FieldSet__Heading">Customer information</div>
    </div>
    <div className="FieldSet__Content">
      <InputField
        className="InputField Field--Email"
        placeholder="Email"
        type="email"
        name="email"
        messageType={errors && 'alert'}
        messageText={errors && errors[0].message}
        value={customer.email_address}
        onChange={(e) => dispatch({
          type: 'email_address',
          payload: e.target.value,
        })}
        onBlur={submit}
      />
    </div>
  </section>
);

EmailField.propTypes = {
  customer: PropTypes.any,
  dispatch: PropTypes.func,
  errors: PropTypes.any,
  submit: PropTypes.func,
};

export default EmailField;
