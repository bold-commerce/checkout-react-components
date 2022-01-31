import { useContext } from 'react';
import { CheckoutStore } from '../store';
import { ApplicationState, CheckoutState } from '../types';
import { ActionType } from '../types/enums';

const useApplicationState = () : {
  data: CheckoutState,
  updateApplicationState: (newState: ApplicationState) => Promise<void>
} => {
  const { state, dispatch } = useContext(CheckoutStore);

  const setApplicationStatus = async (newState: ApplicationState): Promise<void> => {
    dispatch({
      type: ActionType.Checkout_Update,
      payload: newState,
    });
  };

  return {
    data: state,
    updateApplicationState: setApplicationStatus,
  };
};

export default useApplicationState;
