/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputField } from '@boldcommerce/stacks-ui';
import useCustomer from '../../hooks/useCustomer';
import './Customer.css';

const Customer = ({
  customer, customerErrors, isAuthenticated, submitCustomer,
}) => {
  const [email, setEmail] = useState(customer?.email_address);

  return (
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
          messageType={customerErrors && 'alert'}
          messageText={customerErrors && customerErrors.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isAuthenticated}
          onBlur={() => submitCustomer({
            email_address: email,
          })}
        />
      </div>
    </section>
  );
};

Customer.propTypes = {
  customer: PropTypes.object,
  customerErrors: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  submitCustomer: PropTypes.func,
};

const MemoizedCustomer = React.memo(Customer);

const CustomerContainer = () => {
  const {
    customer, customerErrors, isAuthenticated, submitCustomer,
  } = useCustomer();

  return (
    <MemoizedCustomer
      customer={customer}
      customerErrors={customerErrors}
      isAuthenticated={isAuthenticated}
      submitCustomer={submitCustomer}
    />
  );
};

export default CustomerContainer;
