/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from './Context';
import useCsrfToken from '../hooks/useCsrfToken';

const apiBase = 'https://api.boldcommerce.com/checkout/storefront';

const defaultAddressState = {
  first_name: '',
  last_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  province: '',
  country_code: '',
  province_code: '',
  postal_code: '',
  business_name: '',
  phone_number: '',
};

const defaultCustomerState = {
  first_name: '',
  last_name: '',
  email_address: '',
};

const CheckoutProvider = (props) => {
  const {
    applicationState, initialData, publicOrderId, token, storeIdentifier, children,
  } = props;

  const apiPath = `${apiBase}/${storeIdentifier}/${publicOrderId}`;
  const csrf = useCsrfToken(apiPath, token);

  const [appState, setApplicationState] = useState(applicationState);
  const [shippingAddress, setShippingAddress] = useState({ ...defaultAddressState, ...applicationState.addresses.shipping });
  const [billingAddress, setBillingAddress] = useState({ ...defaultAddressState, ...applicationState.addresses.billing });
  const [shippingLines, setShippingLines] = useState([]);
  const [customer, setCustomer] = useState({ ...defaultCustomerState, ...applicationState.customer });
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingErrors, setShippingErrors] = useState(false);
  const [billingErrors, setBillingErrors] = useState(false);
  const [shippingMethodRequest, setShippingMethodRequest] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const values = {
    applicationState: appState,
    csrf,
    token,
    apiPath,
    setApplicationState,
    initialData,
    customer,
    setCustomer,
    shippingAddress,
    setShippingAddress,
    billingAddress: sameAsShipping ? shippingAddress : billingAddress,
    sameAsShipping,
    setSameAsShipping,
    setBillingAddress,
    isProcessing,
    setIsProcessing,
    shippingLines,
    setShippingLines,
    shippingErrors,
    billingErrors,
    setShippingErrors,
    setBillingErrors,
    shippingMethodRequest,
    setShippingMethodRequest,
  };


  return <CheckoutContext.Provider value={values}>{children}</CheckoutContext.Provider>;
};

CheckoutProvider.propTypes = {
  applicationState: PropTypes.any.isRequired,
  initialData: PropTypes.any.isRequired,
  publicOrderId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  storeIdentifier: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default CheckoutProvider;
