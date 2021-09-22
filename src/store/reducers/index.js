import errorsReducer from './errorsReducer';
import loadingStatusReducer from './loadingStatusReducer';
import orderInfoReducer from './orderInfoReducer';
import stateReducer from './stateReducer';
import orderTotalsReducer from './orderTotalsReducer';

const reducer = (state, action) => {
  const {
    applicationState, errors, loadingStatus, orderInfo,
  } = state;

  const currentState = {
    ...state,
    applicationState: stateReducer(applicationState, action),
    errors: errorsReducer(errors, action),
    loadingStatus: loadingStatusReducer(loadingStatus, action),
    orderInfo: orderInfoReducer(orderInfo, action),
    orderTotals: orderTotalsReducer(state, action),
  };

  return currentState;
};

export default reducer;
