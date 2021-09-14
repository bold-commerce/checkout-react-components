/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputField } from '@boldcommerce/stacks-ui';
import useCustomer from '../../hooks/useCustomer';
import './Customer.css';

export const Customer = ({
  customer, customerErrors, isAuthenticated, submitCustomer, onChange, onLogin,
}) => {
  const [email, setEmail] = useState(customer?.email_address);

  useEffect(() => {
    if (onChange) {
      onChange({
        email_address: email,
      });
    }
  }, [email]);

  return (
    <section className="FieldSet FieldSet--CustomerInformation">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Customer information</div>
        {
          onLogin && (
            <p className="FieldSet__SubHeading">
              Already have an account with us?
              {' '}
              <button type="button" onClick={onLogin}>Log in</button>
            </p>
          )
        }
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
  onChange: PropTypes.func,
  onLogin: PropTypes.func,
};

const MemoizedCustomer = React.memo(Customer);

/**
 * If onChange is provided, stop automatic submitting of customer to api and instead pass customer object up to parent through onChange callback
 */
const CustomerContainer = ({ onChange, onLogin }) => {
  const {
    customer, customerErrors, isAuthenticated, submitCustomer,
  } = useCustomer();

  return (
    <MemoizedCustomer
      customer={customer}
      customerErrors={customerErrors}
      isAuthenticated={isAuthenticated}
      onChange={onChange}
      submitCustomer={onChange || submitCustomer}
      onLogin={onLogin}
    />
  );
};

CustomerContainer.propTypes = {
  onChange: PropTypes.func,
  onLogin: PropTypes.func,
};

export default CustomerContainer;
