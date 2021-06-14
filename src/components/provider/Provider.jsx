/* eslint-disable react/forbid-prop-types */
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { CheckoutApp } from '../checkout_app';
import { initialState, reducer, CheckoutStore } from '../../store';

const CheckoutProvider = ({
  applicationState, initialData, publicOrderId, token, storeIdentifier, children, apiBase = 'https://api.boldcommerce.com/checkout/storefront',
}) => {
  const apiPath = `${apiBase}/${storeIdentifier}/${publicOrderId}`;
  const currentState = {
    ...initialState,
    applicationState,
    initialData,
    publicOrderId,
    token,
    storeIdentifier,
    apiBase,
    apiPath,
  };

  const [state, dispatch] = useReducer(reducer, currentState);

  return (
    <CheckoutStore.Provider value={{ state, dispatch }}>
      <CheckoutApp>
        {children}
      </CheckoutApp>
    </CheckoutStore.Provider>
  );
};

CheckoutProvider.propTypes = {
  applicationState: PropTypes.any.isRequired,
  initialData: PropTypes.any.isRequired,
  publicOrderId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  storeIdentifier: PropTypes.string.isRequired,
  apiBase: PropTypes.string,
  children: PropTypes.node,
};

export default CheckoutProvider;
