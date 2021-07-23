/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputField, Button } from '@boldcommerce/stacks-ui';
import useCustomer from '../../hooks/useCustomer';
import './OneClickEmail.css';

const OneClickEmail = ({
    customer, customerErrors, isAuthenticated, submitCustomer, onChange, isLoggedIn, nextButtonText, onIncrementStep, handleLogin
}) => {
    const [email, setEmail] = useState(customer?.email_address);

    useEffect(() => {
    if (onChange) {
        onChange({
        email_address: email,
        });
    }
    }, [email]);

    const tryStepIncrement = async () => {
      await submitCustomer({ email_address: email });

      if (!customerErrors) {
        onIncrementStep();
      }  
    }

    return (
    <>
        <section className="FieldSet FieldSet--CustomerInformation">
        <div className="FieldSet__Header">
            <div className="FieldSet__Heading">Email</div>
            { !isLoggedIn && (<button className="CheckoutStep__ChangeBtn" onClick={handleLogin}>Log in</button>) }
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
            />
        </div>
        </section>
        {   (nextButtonText && (
            <Button className="CheckoutStep__NextBtn" onClick={() => tryStepIncrement()}>{nextButtonText}</Button>
        ))
        }   
    </> 
    );
};

OneClickEmail.propTypes = {
  customer: PropTypes.object,
  customerErrors: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  submitCustomer: PropTypes.func,
  nextButtonText: PropTypes.string,
  onChange: PropTypes.func,
  onIncrementStep: PropTypes.func,
  handleLogin: PropTypes.func,
};

const MemoizedOneClickEmail = React.memo(OneClickEmail);

const OneClickEmailContainer = ({ onChange, onIncrementStep, nextButtonText, isLoggedIn, handleLogin }) => {
  const {
    customer, customerErrors, isAuthenticated, submitCustomer
  } = useCustomer();

  return (
    <MemoizedOneClickEmail
      customer={customer}
      customerErrors={customerErrors}
      isAuthenticated={isAuthenticated}
      onChange={onChange}
      submitCustomer={submitCustomer}
      onIncrementStep={onIncrementStep}
      isLoggedIn={isLoggedIn}
      nextButtonText={nextButtonText}
      handleLogin={handleLogin}
    />
  );
};

OneClickEmailContainer.propTypes = {
  onChange: PropTypes.func,
  onIncrementStep: PropTypes.func,
  nextButtonText: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  handleLogin: PropTypes.func,
};

export default OneClickEmailContainer;