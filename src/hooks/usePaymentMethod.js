import { useContext } from 'react';
import { CheckoutStore } from '../store';

const usePaymentMethod = () => {
  const { state } = useContext(CheckoutStore);

  const loading = state.loadingStatus.shippingLines === 'fetching' || state.loadingStatus.shippingAddress === 'setting';
  const errors = state.errors.shippingAddress;
  const isValid = state.applicationState?.shipping?.selected_shipping && state.applicationState.customer?.email_address;
  const showPaymentMethod = loading || !!errors || !isValid;

  return {
    showPaymentMethod,
  };
};

export default usePaymentMethod;
