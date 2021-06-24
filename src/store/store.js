import React from 'react';

export const initialState = {
  applicationState: {},
  initialData: {},
  publicOrderId: null,
  token: null,
  storeIdentifier: null,
  apiBase: 'https://api.boldcommerce.com/checkout/storefront',
  apiPath: '',
  isAuthenticated: false,
  csrf: null,
  errors: {
    customer: null,
    shippingAddress: null,
    billingAddress: null,
    discount: null,
    paymentIframe: null,
  },
  loadingStatus: {
    customer: 'fulfilled',
    shippingAddress: 'fulfilled',
    shippingLines: 'fulfilled',
    paymentIframe: 'fulfilled',
    lineItems: 'fulfilled',
    discount: 'fulfilled',
    isLoading: false,
  },
  orderInfo: {
    orderStatus: 'pending',
    billingSameAsShipping: true,
  },
  orderTotals: {
    subTotal: 0,
    shippingTotal: 0,
    excludedTaxes: 0,
    discountTotal: 0,
    total: 0,
    remainingBalance: 0,
    taxesTotal: 0,
    totalItems: 0,
  },
};

export const CheckoutStore = React.createContext(null);
