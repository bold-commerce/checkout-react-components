import { useContext } from 'react';
import { CheckoutStore } from '../store';

const useErrors = () => {
  const { state } = useContext(CheckoutStore);

  return {
    data: state.errors,
  };
};

export default useErrors;
