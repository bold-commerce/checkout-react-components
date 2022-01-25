import { Action } from "../../types/Action";
import { LoadingState } from "../../types/enums/LoadingState";
import { LoadingStatus } from "../../types/LoadingStatus";

const setLoadingState = (state: LoadingStatus, type: string, status: LoadingState): LoadingStatus => {
  const loadingState = {
    ...state,
    [type]: status,
  };

  const isLoading = Object.values(loadingState).some((value) => value === 'fetching' || value === 'setting');

  return {
    ...loadingState,
    isLoading,
  };
};

const clearLoadingState = (): LoadingStatus => ({
  customer: LoadingState.fulfilled,
  shippingAddress: LoadingState.fulfilled,
  billingAddress: LoadingState.fulfilled,
  shippingLines: LoadingState.fulfilled,
  paymentIframe: LoadingState.fulfilled,
  lineItems: LoadingState.fulfilled,
  discount: LoadingState.fulfilled,
  orderMetadata: LoadingState.fulfilled,
  isLoading: false,
});

const loadingStatusReducer = (state: LoadingStatus, action: Action<any>): LoadingStatus => {
  switch (action.type) {
    // Customer Actions
    case 'checkout/customer/setting':
      return setLoadingState(state, 'customer', LoadingState.setting);
    case 'checkout/customer/set':
      return setLoadingState(state, 'customer', LoadingState.fulfilled);
    case 'checkout/customer/setErrors':
      return setLoadingState(state, 'customer', LoadingState.fulfilled);

    // Shipping Address Actions
    case 'checkout/shippingAddress/setIncomplete':
      return setLoadingState(state, 'shippingAddress', LoadingState.incomplete);
    case 'checkout/shippingAddress/setting':
      return setLoadingState(state, 'shippingAddress', LoadingState.setting);
    case 'checkout/shippingAddress/set':
      return setLoadingState(state, 'shippingAddress', LoadingState.fulfilled);
    case 'checkout/shippingAddress/setErrors':
      return setLoadingState(state, 'shippingAddress', LoadingState.fulfilled);

    // Billing Address Actions
    case 'checkout/billingAddress/setIncomplete':
      return setLoadingState(state, 'billingAddress', LoadingState.incomplete);
    case 'checkout/billingAddress/setting':
      return setLoadingState(state, 'billingAddress', LoadingState.setting);
    case 'checkout/billingAddress/set':
      return setLoadingState(state, 'billingAddress', LoadingState.fulfilled);
    case 'checkout/billingAddress/setErrors':
      return setLoadingState(state, 'billingAddress', LoadingState.fulfilled);

    // Shipping Line Actions
    case 'checkout/shippingLines/fetching':
      return setLoadingState(state, 'shippingLines', LoadingState.fetching);
    case 'checkout/shippingLines/fetched':
      return setLoadingState(state, 'shippingLines', LoadingState.fulfilled);
    case 'checkout/shippingLines/setting':
      return setLoadingState(state, 'shippingLines', LoadingState.setting);
    case 'checkout/shippingLines/set':
      return setLoadingState(state, 'shippingLines', LoadingState.fulfilled);

    // Payment Iframe Actions
    case 'checkout/paymentIframe/fetching':
      return setLoadingState(state, 'paymentIframe', LoadingState.fetching);
    case 'checkout/paymentIframe/fetched':
      return setLoadingState(state, 'paymentIframe', LoadingState.fulfilled);
    case 'checkout/paymentIframe/authorizing':
      return setLoadingState(state, 'paymentIframe', LoadingState.setting);
    case 'checkout/paymentIframe/setPaymentIframeErrors':
      return setLoadingState(state, 'paymentIframe', LoadingState.fulfilled);

    // Order Actions
    case 'checkout/order/setErrors':
      return clearLoadingState();

    // Line Item Actions
    case 'checkout/lineItem/removing':
      return setLoadingState(state, 'lineItems', LoadingState.setting);
    case 'checkout/lineItem/removed':
      return setLoadingState(state, 'lineItems', LoadingState.fulfilled);
    case 'checkout/lineItem/setting':
      return setLoadingState(state, 'lineItems', LoadingState.setting);
    case 'checkout/lineItem/set':
      return setLoadingState(state, 'lineItems', LoadingState.fulfilled);
    case 'checkout/lineItem/adding':
      return setLoadingState(state, 'lineItems', LoadingState.setting);
    case 'checkout/lineItem/added':
      return setLoadingState(state, 'lineItems', LoadingState.fulfilled);

    // Discount Actions
    case 'checkout/discount/adding':
      return setLoadingState(state, 'discount', LoadingState.setting);
    case 'checkout/discount/added':
      return setLoadingState(state, 'discount', LoadingState.fulfilled);
    case 'checkout/discount/removing':
      return setLoadingState(state, 'discount', LoadingState.setting);
    case 'checkout/discount/removed':
      return setLoadingState(state, 'discount', LoadingState.fulfilled);
    case 'checkout/discount/setErrors':
      return setLoadingState(state, 'discount', LoadingState.fulfilled);

    // Order Metadata Actions
    case 'checkout/orderMetadata/setting':
      return setLoadingState(state, 'orderMetadata', LoadingState.setting);
    case 'checkout/orderMetadata/set':
      return setLoadingState(state, 'orderMetadata', LoadingState.fulfilled);

    default:
      return state;
  }
};

export default loadingStatusReducer;
