import { useContext } from 'react';
import { CheckoutStore } from '../store';
import { ApplicationState } from '../types/applicationState';

const useApplicationState = () : {data: ApplicationState, updateApplicationState: CallableFunction} => {
  const { state, dispatch } : {state: ApplicationState; dispatch: CallableFunction} = useContext(CheckoutStore);

  const setApplicationStatus = ( newState: ApplicationState ) => {
    dispatch({
      type: 'checkout/update',
      payload: newState,
    });
  };

  return {
    data: state,
    updateApplicationState: setApplicationStatus,
  };
};

export default useApplicationState;
