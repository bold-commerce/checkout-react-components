import { useContext } from 'react';
import { CheckoutStatus } from '../store';

const useCheckoutStore = () => {
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);

  return { state: statusState, dispatch: dispatchStatus };
};

export default useCheckoutStore;
