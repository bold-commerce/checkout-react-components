import { ActionType } from "../../types/enums/ActionType";
import { Action } from "../../types/Action";
import { OrderState } from "../../types/enums/OrderState";
import { OrderInfo } from "../../types/OrderInfo";

const orderInfoReducer = (state: OrderInfo, action: Action): OrderInfo => {
  switch (action.type) {
    case ActionType.Checkout_BillingAddress_SetBillingSameAsShipping:
      return {
        ...state,
        billingSameAsShipping: action.payload,
      };
    case ActionType.Checkout_Order_Processing:
      return {
        ...state,
        orderStatus: OrderState.processing,
      };
    case ActionType.Checkout_PaymentIframe_Authorizing:
      return {
        ...state,
        orderStatus: OrderState.authorizing,
      };
    case ActionType.Checkout_PaymentIframe_SetPaymentIframeErrors:
      return {
        ...state,
        orderStatus: OrderState.error,
      };
    case ActionType.Checkout_Order_SetErrors:
      return {
        ...state,
        orderStatus: OrderState.error,
      };
    case ActionType.Checkout_Order_Processed:
      return {
        ...state,
        orderStatus: OrderState.completed,
      };
    default:
      return state;
  }
};

export default orderInfoReducer;
