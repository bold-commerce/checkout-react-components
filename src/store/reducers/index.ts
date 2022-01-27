import errorsReducer from './errorsReducer';
import loadingStatusReducer from './loadingStatusReducer';
import orderInfoReducer from './orderInfoReducer';
import stateReducer from './stateReducer';
import orderTotalsReducer from './orderTotalsReducer';
import { Action, CheckoutState } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const reducer = (state: CheckoutState, action: Action): CheckoutState => {
  const {
    applicationState, orderInfo, errors, loadingStatus,
  } = state;

  const currentState = {
    ...state,
    applicationState: stateReducer(applicationState, action),
    orderInfo: orderInfoReducer(orderInfo, action),
    errors: errorsReducer(errors, action),
    orderTotals: orderTotalsReducer(state, action),
    loadingStatus: loadingStatusReducer(loadingStatus, action),
  };

  return currentState;
};
