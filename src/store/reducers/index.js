import errorsReducer from './errorsReducer';
import loadingStatusReducer from './loadingStatusReducer';
import orderInfoReducer from './orderInfoReducer';
import stateReducer from './stateReducer';
import csrfReducer from './csrfReducer';
import orderTotalsReducer from './orderTotalsReducer';

const reducer = (state, action) => {
  const {
    applicationState, errors, loadingStatus, orderInfo, csrf,
  } = state;

  const currentState = {
    ...state,
    csrf: csrfReducer(csrf, action),
    applicationState: stateReducer(applicationState, action),
    errors: errorsReducer(errors, action),
    loadingStatus: loadingStatusReducer(loadingStatus, action),
    orderInfo: orderInfoReducer(orderInfo, action),
    orderTotals: orderTotalsReducer(state, action),
  };

  return currentState;
};

export default reducer;
