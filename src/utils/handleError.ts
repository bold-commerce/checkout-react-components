import OrderError from './orderError';
import FetchResponse from './fetchResponse'
import ErrorResponse from './errorResponse';
import { ActionErrorType } from '../types/enums';

const handleError = (actionType: ActionErrorType, response: FetchResponse) : ErrorResponse | null => {
  if (!response.success) {
    if (response.error?.body?.errors && response.error.status !== 500) {
      if (response.error.status === 401) {
        return {
          type: ActionErrorType.Checkout_Order_SetErrors,
          payload: [{
            field: 'order',
            message: 'Your session has expired',
          }],
          error: response.error,
        };
      }
      return {
        type: actionType,
        payload: response.error.body.errors,
        error: response.error,
      };
    }

    return {
      type: ActionErrorType.Checkout_Order_SetErrors,
      payload: [{
        field: 'order',
        message: 'An error with your order has occurred, please try again',
      }],
      error: new OrderError(),
    };
  }

  return null;
};

export default handleError;
