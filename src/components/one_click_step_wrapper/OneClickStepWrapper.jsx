import CheckoutStep from '../checkout_step/CheckoutStep';
import BillingAddress from '../billing_address/BillingAddress';
import ShippingAddress from '../shipping_address/ShippingAddress';
import OneClickEmail from '../one_click_email/OneClickEmail';
import Payment from '../payment/Payment';
import OneClickShippingLinesWrapper from '../one_click_shipping_lines_wrapper/OneClickShippingLinesWrapper';
import MinimizedEmail from '../minimized_email/MinimizedEmail';
import MinimizedShippingMethod from '../minimized_shipping_method/MinimizedShippingMethod';
import MinimizedShippingAddress from '../minimized_shipping_address/MinimizedShippingAddress';
import OneClickDiscount from '../one_click_discount/OneClickDiscount';
import CheckoutButton from '../checkout_button/CheckoutButton';

import PropTypes from 'prop-types';
import React from 'react';


const OneClickStepWrapper = ({ currStep, handleStepChange, handleIncrementStep, isLoggedIn, handleLogout, handleLogin }) => {
    
  return (
    <>
      <CheckoutStep activeStep={currStep} step={1} stepTitle={"Contact Information"}  
        expandedForms={[<OneClickEmail onIncrementStep={handleIncrementStep} nextButtonText={'Continue to shipping'} isLoggedIn={isLoggedIn} handleLogin={handleLogin} />]} 
        minimizedForms={[<MinimizedEmail isLoggedIn={isLoggedIn} onChangeStep={ isLoggedIn ? handleLogout : handleStepChange} changeButtonText={isLoggedIn ? 'Log out' : 'Change'} step={1} />]}  
      />
      <CheckoutStep activeStep={currStep} step={2} stepTitle={"Shipping"}  
        expandedForms={[<ShippingAddress />, <OneClickShippingLinesWrapper onIncrementStep={handleIncrementStep} nextButtonText={'Continue to billing'} isLoggedIn={isLoggedIn} />]} 
        minimizedForms={[<MinimizedShippingAddress onChangeStep={handleStepChange} changeButtonText={'Change'} step={2} />, <MinimizedShippingMethod onChangeStep={handleStepChange} changeButtonText={'Change'} step={2} />]} 
      />
      <CheckoutStep activeStep={currStep} step={3} stepTitle={"Billing"} 
        expandedForms={[<Payment />, <BillingAddress />, <OneClickDiscount />, <CheckoutButton className={"CheckoutStep__NextBtn"} />]} 
        minimizedForms={[]}
      />
    </>
  );
};

OneClickStepWrapper.propTypes = {
  currStep: PropTypes.number,
  handleStepChange: PropTypes.func,
  handleIncrementStep: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func,
  handleLogin: PropTypes.func
};
  
export default React.memo(OneClickStepWrapper);