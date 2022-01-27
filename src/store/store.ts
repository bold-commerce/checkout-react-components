import React from 'react';
import { LoadingState } from '../types/enums/LoadingState';
import { OrderState } from '../types/enums/OrderState';
import { CheckoutState } from '../types/CheckoutState';
import { Action } from '../types/Action';
import { ActionPayload } from '../types/ActionPayload';

export const initialState: CheckoutState = {
  applicationState: {
    customer: null,
    addresses: {
      shipping: null,
      billing: null
    },
    line_items: [],
    shipping: null,
    taxes: [],
    discounts: [],
    payments: [],
    order_total: 0,
    order_meta_data: null
  },
  initialData: {
    shop_name: '',
    country_info: [],
    supported_languages: []
  },
  publicOrderId: null,
  token: '',
  storeIdentifier: '',
  apiBase: 'https://api.boldcommerce.com/checkout/storefront',
  apiPath: '',
  isAuthenticated: false,
  orderInfo: {
    orderStatus: OrderState.pending,
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
  errors: {
    customer: null,
    shippingAddress: null,
    billingAddress: null,
    shippingLines: null,
    lineItems: null,
    orderMetadata: null,
    discount: null,
    paymentIframe: null,
    order: null,
  },
  loadingStatus: {
    customer: LoadingState.fulfilled,
    shippingAddress: LoadingState.fulfilled,
    billingAddress: LoadingState.fulfilled,
    shippingLines: LoadingState.fulfilled,
    paymentIframe: LoadingState.fulfilled,
    lineItems: LoadingState.fulfilled,
    discount: LoadingState.fulfilled,
    orderMetadata: LoadingState.fulfilled,
    isLoading: false,
  },
};

export const CheckoutStore = React.createContext<{
  state: CheckoutState,
  dispatch: React.Dispatch<Action<ActionPayload[]>>,
  onError: Function
}>({
  state: initialState,
  dispatch: () => null,
  onError: () => null
});
