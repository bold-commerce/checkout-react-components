import errorsReducer from './errorsReducer';
import loadingStatusReducer from './loadingStatusReducer';
import orderInfoReducer from './orderInfoReducer';
import stateReducer from './stateReducer';
import orderTotalsReducer from './orderTotalsReducer';

export const reducer = (state, action) => {
  const { applicationState, orderInfo } = state;

  const currentState = {
    ...state,
    applicationState: stateReducer(applicationState, action),
    orderInfo: orderInfoReducer(orderInfo, action),
    orderTotals: orderTotalsReducer(state, action),
  };

  return currentState;
};

export const statusReducer = (state, action) => {
  const { errors, loadingStatus } = state;

  const currentState = {
    ...state,
    errors: errorsReducer(errors, action),
    loadingStatus: loadingStatusReducer(loadingStatus, action),
  };

  return currentState;
};
