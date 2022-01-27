import { ActionType } from "../../types/enums/ActionType";
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

const loadingStatusReducer = (state: LoadingStatus, action: Action): LoadingStatus => {
  switch (action.type) {
    // Customer Actions
    case ActionType.Checkout_Customer_Setting:
      return setLoadingState(state, 'customer', LoadingState.setting);
    case ActionType.Checkout_Customer_Set:
      return setLoadingState(state, 'customer', LoadingState.fulfilled);
    case ActionType.Checkout_Customer_SetErrors:
      return setLoadingState(state, 'customer', LoadingState.fulfilled);

    // Shipping Address Actions
    case ActionType.Checkout_ShippingAddress_SetIncomplete:
      return setLoadingState(state, 'shippingAddress', LoadingState.incomplete);
    case ActionType.Checkout_ShippingAddress_Setting:
      return setLoadingState(state, 'shippingAddress', LoadingState.setting);
    case ActionType.Checkout_ShippingAddress_Set:
      return setLoadingState(state, 'shippingAddress', LoadingState.fulfilled);
    case ActionType.Checkout_ShippingAddress_SetErrors:
      return setLoadingState(state, 'shippingAddress', LoadingState.fulfilled);

    // Billing Address Actions
    case ActionType.Checkout_BillingAddress_SetIncomplete:
      return setLoadingState(state, 'billingAddress', LoadingState.incomplete);
    case ActionType.Checkout_BillingAddress_Setting:
      return setLoadingState(state, 'billingAddress', LoadingState.setting);
    case ActionType.Checkout_BillingAddress_Set:
      return setLoadingState(state, 'billingAddress', LoadingState.fulfilled);
    case ActionType.Checkout_BillingAddress_SetErrors:
      return setLoadingState(state, 'billingAddress', LoadingState.fulfilled);

    // Shipping Line Actions
    case ActionType.Checkout_ShippingLines_Fetching:
      return setLoadingState(state, 'shippingLines', LoadingState.fetching);
    case ActionType.Checkout_ShippingLines_Fetched:
      return setLoadingState(state, 'shippingLines', LoadingState.fulfilled);
    case ActionType.Checkout_ShippingLines_Setting:
      return setLoadingState(state, 'shippingLines', LoadingState.setting);
    case ActionType.Checkout_ShippingLines_Set:
      return setLoadingState(state, 'shippingLines', LoadingState.fulfilled);

    // Payment Iframe Actions
    case ActionType.Checkout_PaymentIframe_Fetching:
      return setLoadingState(state, 'paymentIframe', LoadingState.fetching);
    case ActionType.Checkout_PaymentIframe_Fetched:
      return setLoadingState(state, 'paymentIframe', LoadingState.fulfilled);
    case ActionType.Checkout_PaymentIframe_Authorizing:
      return setLoadingState(state, 'paymentIframe', LoadingState.setting);
    case ActionType.Checkout_PaymentIframe_SetPaymentIframeErrors:
      return setLoadingState(state, 'paymentIframe', LoadingState.fulfilled);

    // Order Actions
    case ActionType.Checkout_Order_SetErrors:
      return clearLoadingState();

    // Line Item Actions
    case ActionType.Checkout_LineItem_Removing:
      return setLoadingState(state, 'lineItems', LoadingState.setting);
    case ActionType.Checkout_LineItem_Removed:
      return setLoadingState(state, 'lineItems', LoadingState.fulfilled);
    case ActionType.Checkout_LineItem_Setting:
      return setLoadingState(state, 'lineItems', LoadingState.setting);
    case ActionType.Checkout_LineItem_Set:
      return setLoadingState(state, 'lineItems', LoadingState.fulfilled);
    case ActionType.Checkout_LineItem_Adding:
      return setLoadingState(state, 'lineItems', LoadingState.setting);
    case ActionType.Checkout_LineItem_Added:
      return setLoadingState(state, 'lineItems', LoadingState.fulfilled);

    // Discount Actions
    case ActionType.Checkout_Discount_Adding:
      return setLoadingState(state, 'discount', LoadingState.setting);
    case ActionType.Checkout_Discount_Added:
      return setLoadingState(state, 'discount', LoadingState.fulfilled);
    case ActionType.Checkout_Discount_Removing:
      return setLoadingState(state, 'discount', LoadingState.setting);
    case ActionType.Checkout_Discount_Removed:
      return setLoadingState(state, 'discount', LoadingState.fulfilled);
    case ActionType.Checkout_Discount_SetErrors:
      return setLoadingState(state, 'discount', LoadingState.fulfilled);

    // Order Metadata Actions
    case ActionType.Checkout_OrderMetadata_Setting:
      return setLoadingState(state, 'orderMetadata', LoadingState.setting);
    case ActionType.Checkout_OrderMetadata_Set:
      return setLoadingState(state, 'orderMetadata', LoadingState.fulfilled);

    default:
      return state;
  }
};

export default loadingStatusReducer;
