/* eslint-disable react/forbid-prop-types */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from './Context';
import useCsrfToken from '../hooks/useCsrfToken';

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
    applicationState, initialData, publicOrderId, token, storeIdentifier, children, apiBase = 'https://api.boldcommerce.com/checkout/storefront'
  } = props;

  const apiPath = `${apiBase}/${storeIdentifier}/${publicOrderId}`;
  const csrf = useCsrfToken(apiPath, token);

  const [appState, setApplicationState] = useState(applicationState);
  const shippingAddress = { ...defaultAddressState, ...appState.addresses.shipping };
  const billingAddress = { ...defaultAddressState, ...appState.addresses.billing };
  const selectedShipping = appState.shipping.selected_shipping;
  const shippingLines = [...appState.shipping.available_shipping_lines];
  const lineItems = [...appState.line_items];
  const customer = { ...defaultCustomerState, ...appState.customer };
  const discountApplied = appState.discounts.length > 0;
  const discountCode = appState.discounts[0]?.code ?? '';
  const { discounts } = appState;
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingErrors, setShippingErrors] = useState(false);
  const [billingErrors, setBillingErrors] = useState(false);
  const [shippingMethodRequest, setShippingMethodRequest] = useState(false);
  const totalPayments = appState?.payments?.length > 0;
  const paymentStatus = appState?.payments[0]?.status !== '';
  const orderProcessed = (totalPayments && paymentStatus) ?? false;
  const taxes = appState?.taxes;
  const payments = appState?.payments;
  const paymentIframeRef = useRef();

  const values = {
    applicationState: appState,
    csrf,
    token,
    apiPath,
    setApplicationState,
    initialData,
    customer,
    shippingAddress,
    billingAddress,
    selectedShipping,
    shippingLines,
    lineItems,
    discountApplied,
    discountCode,
    discounts,
    taxes,
    payments,
    isProcessing,
    setIsProcessing,
    orderProcessed,
    shippingErrors,
    billingErrors,
    setShippingErrors,
    setBillingErrors,
    shippingMethodRequest,
    setShippingMethodRequest,
    paymentIframeRef,
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
