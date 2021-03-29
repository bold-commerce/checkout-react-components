import {
  useState,
  useContext,
  useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const usePayments = (gatewayId) => {
  const {
    apiPath,
    csrf,
    payments,
    setApplicationState,
  } = useContext(CheckoutContext);
  const [paymentErrors] = useState();
  const [loadingPayment] = useState(false);

  const addPayment = useCallback((token) => {
    if (csrf) {
      return fetch(`${apiPath}/payments`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
        body: JSON.stringify({
          token,
          gateway_public_id: gatewayId,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setApplicationState(response.data.application_state);
        });
    }

    return null;
  }, [csrf]);

  return {
    payments,
    paymentErrors,
    loadingPayment,
    addPayment,
  };
};

export default usePayments;
