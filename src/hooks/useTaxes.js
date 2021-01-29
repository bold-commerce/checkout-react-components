import {
  useState,
  useContext,
  useEffect,
} from 'react';
import CheckoutContext from '../components/Context';

const useTaxes = () => {
  const {
    apiPath,
    csrf,
    applicationState,
    setApplicationState,
  } = useContext(CheckoutContext);
  const [errors] = useState();
  const [isLoading] = useState(false);
  const taxApplied = applicationState.taxes.length > 0;
  const tax = applicationState?.taxes;
  const { shipping } = applicationState;
  const shippingID = shipping?.selected_shipping?.id;


  useEffect(() => {
    if (!csrf) return;

    if (csrf && shippingID) {
      fetch(`${apiPath}/taxes`, {
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
          setApplicationState(response.data.application_state);
        });
    }
  }, [shippingID]);

  return {
    errors,
    isLoading,
    taxApplied,
    tax,
  };
};

export default useTaxes;
