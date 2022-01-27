import { Action, CheckoutErrors } from "../../types";
import { ActionType } from "../../types/enums";

const errorsReducer = (state : CheckoutErrors, action: Action): CheckoutErrors => {
  switch (action.type) {
    // Customer Actions
    case ActionType.Checkout_Customer_SetErrors:
      return {
        ...state,
        customer: action.payload,
      };
    case ActionType.Checkout_Customer_Set:
      return {
        ...state,
        customer: null,
        order: null,
      };

    // Shipping Address Actions
    case ActionType.Checkout_ShippingAddress_SetErrors:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case ActionType.Checkout_ShippingAddress_Set:
      return {
        ...state,
        shippingAddress: null,
        order: null,
      };

    // Billing Address Actions
    case ActionType.Checkout_BillingAddress_SetErrors:
      return {
        ...state,
        billingAddress: action.payload,
      };
    case ActionType.Checkout_BillingAddress_Set:
      return {
        ...state,
        billingAddress: null,
        order: null,
      };

    // Shipping Line Actions
    case ActionType.Checkout_ShippingLines_SetErrors:
      return {
        ...state,
        shippingLines: action.payload,
      };
    case ActionType.Checkout_ShippingLines_Set:
      return {
        ...state,
        shippingLines: null,
        order: null,
      };

    // Line Item Actions
    case ActionType.Checkout_LineItem_SetErrors:
      return {
        ...state,
        lineItems: action.payload,
      };
    case ActionType.Checkout_LineItem_Set:
      return {
        ...state,
        lineItems: null,
        order: null,
      };

    // Payment Iframe Actions
    case ActionType.Checkout_PaymentIframe_SetPaymentIframeErrors:
      return {
        ...state,
        paymentIframe: action.payload,
      };

    // Order Actions
    case ActionType.Checkout_Order_SetErrors:
      return {
        ...state,
        order: action.payload,
      };
    case ActionType.Checkout_Order_Set:
      return {
        ...state,
        order: null,
      };
    case ActionType.Checkout_Order_Processing:
      return {
        ...state, 
        order: null
      };

    // Discount Actions
    case ActionType.Checkout_Discount_SetErrors:
      return {
        ...state,
        discount: action.payload,
      };
    case ActionType.Checkout_Discount_Added:
      return {
        ...state,
        discount: null,
        order: null,
      };
    case ActionType.Checkout_Discount_Removed:
      return {
        ...state,
        discount: null,
        order: null,
      };

    // Order Metadata Actions
    case ActionType.Checkout_OrderMetadata_SetErrors:
      return {
        ...state,
        orderMetadata: action.payload,
      };
    case ActionType.Checkout_OrderMetadata_Set:
      return {
        ...state,
        orderMetadata: null,
        order: null,
      };

    default:
      return state;
  }
};

export default errorsReducer;
