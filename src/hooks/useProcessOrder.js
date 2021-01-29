import {
  useContext, useCallback,
} from 'react';
import CheckoutContext from '../components/Context';
import usePayments from './usePayments';

const useProcessOrder = (gatewayId) => {
  const {
    apiPath, csrf, setApplicationState, isProcessing, setIsProcessing,
  } = useContext(CheckoutContext);
  // const { addPayment } = usePayments(gatewayId);

  // type: 'PAYMENT_GATEWAY_FRAME_PRE_AUTHORIZED_CARD',

  // TODO: Add error handling
  const processOrder = useCallback(async () => {
    try {
      setIsProcessing(true);
      // await addPayment(token);
      fetch(`${apiPath}/process_order`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.data && response.data.application_state) {
            setApplicationState(response.data.application_state);
            setIsProcessing(false);
          }
        });
    } catch (e) {
      console.error(e);
    }
  }, [csrf]);

  return {
    processOrder, isProcessing,
  };
};

export default useProcessOrder;
