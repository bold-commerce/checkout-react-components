import { Action } from "../../types/Action";
import { OrderState } from "../../types/enums/OrderState";
import { OrderInfo } from "../../types/OrderInfo";

const orderInfoReducer = (state: OrderInfo, action: Action<any>): OrderInfo => {
  switch (action.type) {
    case 'checkout/billingAddress/setBillingSameAsShipping':
      return {
        ...state,
        billingSameAsShipping: action.payload,
      };
    case 'checkout/order/processing':
      return {
        ...state,
        orderStatus: OrderState.processing,
      };
    case 'checkout/paymentIframe/authorizing':
      return {
        ...state,
        orderStatus: OrderState.authorizing,
      };
    case 'checkout/paymentIframe/setPaymentIframeErrors':
      return {
        ...state,
        orderStatus: OrderState.error,
      };
    case 'checkout/order/setErrors':
      return {
        ...state,
        orderStatus: OrderState.error,
      };
    case 'checkout/order/processed':
      return {
        ...state,
        orderStatus: OrderState.completed,
      };
    default:
      return state;
  }
};

export default orderInfoReducer;
