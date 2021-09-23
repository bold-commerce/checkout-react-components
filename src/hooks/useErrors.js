import { useContext } from 'react';
import { CheckoutStatus } from '../store';

const useErrors = () => {
  const { statusState } = useContext(CheckoutStatus);

  return {
    data: statusState.errors,
  };
};

export default useErrors;
