/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputField, Button } from '@boldcommerce/stacks-ui';
import './OneClickEmail.css';

const OneClickEmailField = ({
  customer,
  dispatch,
  errors,
  submit,
  nextButtonText,
  onIncrementStep,
  loggedIn,
  handleLogin
}) => {

    // TODO: change back 
    const tryStepIncrement = async () => {
        const valid = await submit();
        if (valid) {
            onIncrementStep();
        } else {
            onIncrementStep();
        }
        
    }

    return (
        <>
        <section className="FieldSet FieldSet--CustomerInformation">
            <div className="FieldSet__Header">
            <div className="FieldSet__Heading">Email</div>
            { !loggedIn && (<button className="CheckoutStep__ChangeBtn" onClick={handleLogin}>Log in</button>) }
            
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
                />
            </div>
        </section>
        {   (nextButtonText && (
                <Button className="CheckoutStep__NextBtn" onClick={() => tryStepIncrement()}>{nextButtonText}</Button>
            ))
        }    
        </>
    );
}
OneClickEmailField.propTypes = {
  customer: PropTypes.any,
  dispatch: PropTypes.func,
  errors: PropTypes.any,
  submit: PropTypes.func,
};

export default OneClickEmailField;