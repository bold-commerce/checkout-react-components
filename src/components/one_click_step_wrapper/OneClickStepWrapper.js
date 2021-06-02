import { BillingAddress, PaymentMethod, ShippingAddress, withBillingAddressLogic, withCustomerLogic, withPaymentLogic, withShippingAddressLogic, withShippingMethodLogic } from '../../../';
import OneClickStep from '../one_click_step/OneClickStep';
import OneClickEmailField from '../one_click_email/OneClickEmail';
import MinimizedEmail from '../minimized_email/MinimizedEmail';
import MinimizedShippingMethod from '../minimized_shipping_method/MinimizedShippingMethod';
import MinimizedShippingAddress from '../minimized_shipping_address/MinimizedShippingAddress';
import OneClickDiscount from '../one_click_discount/OneClickDiscount.js';
import OneClickShippingMethod from '../one_click_shipping_method/OneClickShippingMethod';
import LoggedInShippingAddress from '../logged_in_shipping_address/LoggedInShippingAddress';
import withCheckoutButtonLogic from '../checkout_button/withCheckoutButtonLogic';
import CheckoutButton from '../checkout_button/CheckoutButton';

import PropTypes from 'prop-types';
import React from 'react';

const EnhancedEmail = withCustomerLogic(OneClickEmailField);
const EnhancedShippingAddress = withShippingAddressLogic(ShippingAddress);
const EnhancedBillingAddress = withBillingAddressLogic(BillingAddress);
const EnhancedShippingMethod = withShippingMethodLogic(OneClickShippingMethod);
const EnhancedPaymentMethod = withPaymentLogic(PaymentMethod);
const EnhancedLoggedInShippingAddress = withShippingAddressLogic(LoggedInShippingAddress);
const EnhancedCheckoutButton = withCheckoutButtonLogic(CheckoutButton);


const OneClickStepWrapper = ({ currStep, handleStepChange, handleIncrementStep, loggedIn, handleLogout, handleLogin}) => {

    const expandedShippingAddressComponent = loggedIn ? <EnhancedLoggedInShippingAddress /> : <EnhancedShippingAddress />;

    return (
      <>
        <OneClickStep activeStep={currStep} step={1} stepTitle={"Contact Information"}  expandedForms={[<EnhancedEmail onIncrementStep={handleIncrementStep} nextButtonText={'Continue to shipping'} loggedIn={loggedIn} handleLogin={handleLogin} />]} minimizedForms={[<MinimizedEmail onChangeStep={ loggedIn ? handleLogout : handleStepChange} changeButtonText={loggedIn ? 'Log out' : 'Change'} step={1} />]}  />
        <OneClickStep activeStep={currStep} step={2} stepTitle={"Shipping"}  expandedForms={[expandedShippingAddressComponent, <EnhancedShippingMethod onIncrementStep={handleIncrementStep} nextButtonText={'Continue to billing'}/>]} minimizedForms={[<MinimizedShippingAddress onChangeStep={handleStepChange} changeButtonText={'Change'} step={2} />, <MinimizedShippingMethod onChangeStep={handleStepChange} changeButtonText={'Change'} step={2} />]} />
        <OneClickStep activeStep={currStep} step={3} stepTitle={"Billing"} expandedForms={[<EnhancedPaymentMethod />, <EnhancedBillingAddress />, <OneClickDiscount />, <EnhancedCheckoutButton className={"CheckoutStep__NextBtn"} buttonText={"Pay now"} />]} minimizedForms={[]}/>
      </>
    );
  }

  OneClickStepWrapper.propTypes = {
    currStep: PropTypes.number,
    handleStepChange: PropTypes.func,
    loggedIn: PropTypes.bool,
    handleLogout: PropTypes.func,
    handleLogin: PropTypes.func
  };
  

  export default OneClickStepWrapper;