import { useContext } from 'react';
import { CheckoutStore } from '../store';

const useLoadingStatus = () => {
  const { state } = useContext(CheckoutStore);
  const {
    isLoading,
    shippingAddress,
    shippingLines,
    customer,
    paymentIframe,
    lineItems,
    discount,
  } = state.loadingStatus;

  return {
    isLoading,
    shippingAddressLoadingStatus: shippingAddress,
    shippingLinesLoadingStatus: shippingLines,
    customerLoadingStatus: customer,
    paymentIframeLoadingStatus: paymentIframe,
    lineItemsLoadingStatus: lineItems,
    discountLoadingStatus: discount,
  };
};

export default useLoadingStatus;
